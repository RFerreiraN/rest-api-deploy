import { readJSON } from '../util.js'
import { randomUUID } from 'node:crypto'

const productos = readJSON('./productos.json')

export class ProductoModel {
  static async getAll({ categoria }) {
    if (categoria) {
      return productos.filter(producto => producto.category === categoria)
    }
    return productos
  }

  static async getById({ id }) {
    const producto = productos.find(producto => producto.id === id)
    return producto
  }

  static async create({ input }) {
    const nuevoProducto = {
      id: randomUUID(),
      ...input
    }
    productos.push(nuevoProducto)

    return (nuevoProducto)
  }

  static async delete({ id }) {
    const index = productos.findIndex(producto => producto.id === id)
    if (index === -1) return false

    productos.splice(index, 1)
    return true
  }

  static async update({ id, input }) {
    const index = productos.findIndex(producto => producto.id === id)

    if (index < 0) {
      return false
    }

    productos[index] = {
      ...productos[index],
      ...input
    }

    return productos[index]
  }
}
