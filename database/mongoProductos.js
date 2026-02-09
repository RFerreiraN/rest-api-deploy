import 'dotenv/config'
import mongoose from 'mongoose'

const uri = process.env.URL_DB

export async function connectDB() {
  try {
    await mongoose.connect(uri)
    console.log('Conectado a base de datos')
  } catch (error) {
    console.error('Error al conectar con base de datos', error)
    process.exit(1)
  }
}
