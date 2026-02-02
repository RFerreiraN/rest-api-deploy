import { Router } from 'express'
import { validatePartialProducto, validateProducto } from '../Schema/productos.js'
import { ProductoModel } from '../models/producto.js'

export const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
  const { categoria } = req.query
  const productos = await ProductoModel.getAll({ categoria })
  return res.json(productos)
})

productsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const producto = await ProductoModel.getById({ id })
  if (producto) return res.json(producto)
  res.status(404).json({ message: 'Producto not found' })
})

productsRouter.post('/', async (req, res) => {
  const result = validateProducto(req.body)
  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }
  const nuevoProducto = await ProductoModel.create({ input: result.data })
  res.status(201).json(nuevoProducto)
})

productsRouter.patch('/:id', async (req, res) => {
  const result = validatePartialProducto(req.body)

  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const updateProducto = await ProductoModel.update({ id, input: result.data })
  return res.json(updateProducto)
})

productsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const result = await ProductoModel.delete({ id })
  if (!result) {
    return res.status(404).json({ message: '404 Producto not found' })
  }
  return res.json({ message: 'Producto deleted' })
})
