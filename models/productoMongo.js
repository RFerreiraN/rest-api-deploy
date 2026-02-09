import { ProductoMongo } from '../Schema/productosMongo.js'

export class ModelProductoMongo {
  static async getAll({ categoria }) {
    if (categoria) {
      return await ProductoMongo.find({ category: categoria })
    }
    return await ProductoMongo.find()
  }

  static async getById({ id }) {
    return await ProductoMongo.findById(id)
  }

  static async create({ input }) {
    const nuevoProducto = new ProductoMongo(input)
    return await nuevoProducto.save()
  }

  static async update({ input, id }) {
    return await ProductoMongo.findByIdAndUpdate(
      id,
      input,
      { new: true }
    )
  }

  static async delete({ id }) {
    const result = await ProductoMongo.findByIdAndDelete(id)
    if (result) return true
    return false
  }
}
