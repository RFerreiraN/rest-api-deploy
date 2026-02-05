import { readJSON } from '../util.js'
import { randomUUID } from 'node:crypto'

const productos = readJSON('./productos.json')

export class ModelProducto {
  static async getAll({ categoria }) {
    if (categoria) {
      return productos.filter(
        producto => producto.category === categoria
      )
    }
  }

  static async getById({ id }) {
    return productos.find(
      producto => producto.id.toString() === id
    )
  }

  static async create({ input }) {
    const nuevoProducto = {
      id: randomUUID(),
      ...input
    }
    productos.push(nuevoProducto)
  }

  static async update({ id, input }) {
    const index = productos.findIndex(
      producto => producto.id.toString() === id
    )

    if (index < 0) {
      return false
    }
    const updateProducto = {
      ...productos[index],
      ...input
    }
    productos[index] = updateProducto
  }

  static async delete({ id }) {
    const index = productos.findIndex(
      producto => producto.id.toString() === id
    )
    if (index < 0) {
      return false
    }
    productos.splice(index, 1)
    return true
  }
}
