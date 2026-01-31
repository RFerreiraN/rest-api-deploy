const express = require('express')
const app = express()
const productos = require('./productos.json')
const crypto = require('node:crypto')
const cors = require('cors')
const { validateProducto, validatePartialProducto } = require('./Schema/productos')

const PORT = process.env.PORT ?? 1314

app.disable('x-powered-by')
app.use(express.json())
app.use(cors())

app.get('/productos', (req, res) => {
  const { categoria } = req.query
  if (categoria) {
    const categoriaProducto = productos.filter(producto => producto.category === categoria)
    return res.status(200).json(categoriaProducto)
  }
  return res.json(productos)
})

app.get('/productos/:id', (req, res) => {
  const { id } = req.params
  const producto = productos.filter(producto => producto.id.toString() === id)
  return res.status(200).json(producto)
})

app.post('/productos', (req, res) => {
  const result = validateProducto(req.body)
  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const nuevoProducto = {
    id: crypto.randomUUID(),
    ...result.data
  }

  productos.push(nuevoProducto)
  return res.status(200).json(nuevoProducto)
})

app.patch('/productos/:id', (req, res) => {
  const result = validatePartialProducto(req.body)

  if (result.error) {
    return res.status(400).res.json({ message: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const index = productos.findIndex(producto => producto.id.toString() === id)

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

app.delete('/productos/:id', (req, res) => {
  const { id } = req.params
  const index = productos.findIndex(producto => producto.id.toString() === id)
  if (index < 0) {
    return res.status(404).json({ message: '404 Producto Not Found' })
  }
  productos.splice(index, 1)
  return res.status(204).json({})
})

app.use((req, res) => {
  return res.status(404).json({ message: '404 Not Found' })
})

app.listen(PORT, () => {
  console.log(`Server Listening on port: https://rest-api-deploy-1azc.onrender.com/productos`)
})

/*
https://rest-api-deploy-1azc.onrender.com
*/
