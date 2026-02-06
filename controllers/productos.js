import { ModelProducto } from '../models/producto.js'
import { validatePartialProducto, validateProducto } from '../Schema/productos.js'

export class ControllerProducto {
  static async getAll(req, res) {
    const { categoria } = req.query
    const productos = await ModelProducto.getAll({ categoria })
    return res.json(productos)
  }

  static async getByID(req, res) {
    const { id } = req.params
    const getProducto = await ModelProducto.getById({ id })
    if (!getProducto) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    return res.json(getProducto)
  }

  static async create(req, res) {
    const result = validateProducto(req.body)
    if (result.error) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }
    const nuevoProducto = await ModelProducto.create({ input: result.data })
    return res.json(nuevoProducto)
  }

  static async update(req, res) {
    const result = validatePartialProducto(req.body)
    if (result.error) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const updateProducto = await ModelProducto.update({ id, input: result.data })
    return res.json(updateProducto)
  }

  static async delete(req, res) {
    const { id } = req.params
    const result = await ModelProducto.delete({ id })

    if (!result) {
      return res.status(404).json({ message: 'No se puedo borrar el producto, No ha sido encontrado' })
    }

    return res.json({ message: 'Producto eliminado' })
  }
}
