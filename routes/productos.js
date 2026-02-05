import { Router } from 'express'
import { readJSON } from '../util.js'
import { validatePartialProducto, validateProducto } from '../Schema/productos.js'
import { ModelProducto } from '../models/producto.js'

export const routerProducto = Router()
const productos = readJSON('./productos.json')

routerProducto.get('/', async (req, res) => {
  const { categoria } = req.query
  if (categoria) {
    const categoriaProducto = await ModelProducto.getAll({ categoria })
    return res.json(categoriaProducto)
  }
  return res.json(productos)
})

routerProducto.get('/:id', async (req, res) => {
  const { id } = req.params

  const getProducto = await ModelProducto.getById({ id })
  if (!getProducto) {
    return res.status(404).json({ message: 'Producto no encontrado' })
  }
  return res.json(getProducto)
})

routerProducto.post('/', async (req, res) => {
  const result = validateProducto(req.body)
  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const nuevoProducto = await ModelProducto.create({ input: result.data })
  return res.json(nuevoProducto)
})

routerProducto.patch('/:id', async (req, res) => {
  const result = validatePartialProducto(req.body)
  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const updateProducto = await ModelProducto.update({ id, input: result.data })
  return res.json(updateProducto)
})

routerProducto.delete('/:id', async (req, res) => {
  const { id } = req.params
  const result = await ModelProducto.delete({ id })

  if (!result) {
    return res.status(404).json({ message: 'No se puedo borrar el producto, No ha sido encontrado' })
  }

  return res.json({ message: 'Producto eliminado' })
})
