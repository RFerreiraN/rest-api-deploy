import { Router } from 'express'
import { readJSON } from '../util.js'
import { validatePartialProducto, validateProducto } from '../Schema/productos.js'
import { randomUUID } from 'node:crypto'

export const routerProducto = Router()
const productos = readJSON('./productos.json')

routerProducto.get('/', (req, res) => {
  const { categoria } = req.query
  if (categoria) {
    const categoriaProducto = productos.filter(
      producto => producto.category === categoria
    )
    return res.json(categoriaProducto)
  }
  return res.json(productos)
})

routerProducto.get('/:id', (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(404).json({ message: 'Producto no encontrado' })
  }
  const getProducto = productos.find(
    producto => producto.id.toString() === id
  )
  return res.json(getProducto)
})

routerProducto.post('/', (req, res) => {
  const result = validateProducto(req.body)
  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const nuevoProducto = {
    id: randomUUID(),
    ...result.data
  }
  productos.push(nuevoProducto)
  return res.json(nuevoProducto)
})

routerProducto.patch('/:id', (req, res) => {
  const result = validatePartialProducto(req.body)
  if (result.error) {
    return res.status(404).json({ message: JSON.parse(result.error.message) })
  }
  const { id } = req.params
  const index = productos.findIndex(
    producto => producto.id.toString() === id
  )

  if (index < 0) {
    return res.status(404).json({ message: 'Producto no encontrado' })
  }
  const updateProducto = {
    ...productos[index],
    ...result.data
  }

  productos[index] = updateProducto
  return res.json(updateProducto)
})

routerProducto.delete('/:id', (req, res) => {
  const { id } = req.params
  const index = productos.findIndex(
    producto => producto.id.toString() === id
  )
  if (index < 0) {
    return res.status(404).json({ message: 'Producto no encontrado' })
  }

  productos.splice(index, 1)
  return res.status(204).send()
})
