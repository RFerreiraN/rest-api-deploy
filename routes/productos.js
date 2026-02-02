import { Router } from 'express'
import { readJSON } from '../util.js'
import { validatePartialProducto, validateProducto } from '../Schema/productos.js'
import { randomUUID } from 'node:crypto'

const productos = readJSON('./productos.json')

export const productsRouter = Router()

productsRouter.get('/', (req, res) => {
  const { categoria } = req.query
  if (categoria) {
    const categoriaProducto = productos.filter(producto => producto.category === categoria)
    return res.status(200).json(categoriaProducto)
  }
  return res.json(productos)
})

productsRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const producto = productos.filter(producto => producto.id === id)
  return res.status(200).json(producto)
})

productsRouter.post('/', (req, res) => {
  const result = validateProducto(req.body)
  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const nuevoProducto = {
    id: randomUUID(),
    ...result.data
  }
  productos.push(nuevoProducto)
  return res.status(201).json(nuevoProducto)
})

productsRouter.patch('/:id', (req, res) => {
  const result = validatePartialProducto(req.body)

  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const index = productos.findIndex(producto => producto.id === id)

  if (index < 0) {
    return res.status(404).json({ message: '404 Producto Not Found' })
  }

  const updateProducto = {
    ...productos[index],
    ...result.data
  }

  productos[index] = updateProducto
  return res.json(updateProducto)
})

productsRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const index = productos.findIndex(producto => producto.id === id)

  if (index < 0) {
    return res.status(404).json({ message: '404 Not Found' })
  }

  productos.splice(index, 1)
  return res.status(204)
})
