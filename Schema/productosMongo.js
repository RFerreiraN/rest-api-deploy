import mongoose from 'mongoose'

const ratingSchema = new mongoose.Schema({
  rate: { type: Number, default: 2.5 },
  count: { type: Number, default: 100 }
})

const productoSchema = new mongoose.Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  description: { type: String },
  image: { type: String },
  rating: ratingSchema
})

export const ProductoMongo = mongoose.model('Producto', productoSchema)
