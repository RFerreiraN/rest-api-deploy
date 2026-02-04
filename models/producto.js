import { readJSON } from '../util.js'

const productos = readJSON('./productos.json')

export class ProductoModel {
  static async getAll({ categoria }) {
    if (categoria) {
      return productos.filter(
        producto => producto.category === categoria
      )
    }
    return productos
  }

  static async getById({ id }) {
    const getProducto = productos.find(
      producto => producto.id.toString() === id
    )
    if (!getProducto) {
      return false
    }
    return getProducto
  }
}
