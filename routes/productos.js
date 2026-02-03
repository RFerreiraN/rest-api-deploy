import { Router } from 'express'
import { readJSON } from '../util.js'
import { validateProducto, validatePartialProducto } from '../Schema/productos.js'
import { randomUUID } from 'node:crypto'

export const routerProducto = Router()
const productos = readJSON('./productos.json')

routerProducto.get('/', (req, res) => {
  const { categoria } = req.query
  if (categoria) {
    const categoriaProducto = productos.filter(
      producto => producto.category === categoria
    )
    return res.status(200).json(categoriaProducto)
  }
  return res.json(productos)
})

routerProducto.get('/:id', (req, res) => {
  const { id } = req.params
  const getProducto = productos.find(
    producto => producto.id.toString() === id
  )
  if (!getProducto) {
    return res.status(404).json({ message: '404 Producto noy found' })
  }
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
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }
  const { id } = req.params
  const indexProducto = productos.findIndex(
    producto => producto.id.toString() === id
  )
  if (indexProducto < 0) {
    return res.status(404).json({ message: '404 Producto not found' })
  }

  const updateProducto = {
    ...productos[indexProducto],
    ...result.data
  }

  productos[indexProducto] = updateProducto
  return res.json(updateProducto)
})

routerProducto.delete('/:id', (req, res) => {
  const { id } = req.params
  const index = productos.findIndex(
    producto => producto.id.toString() === id
  )
  if (index < 0) {
    return res.status(404).json({ message: '404 Not Found' })
  }

  productos.splice(index, 1)
  return res.status(204).send()
})
