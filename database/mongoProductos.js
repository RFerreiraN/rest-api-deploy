// import mongoose from 'mongoose'

// const MONGO_URI = 'mongodb://127.0.0.1:27017//tienda'

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGO_URI)
//     console.log('Conectado a base de datos')
//   } catch (error) {
//     console.error('Error conectando a la base de datos', error)
//     process.exit(1)
//   }
// }

import { MongoClient } from 'mongodb'

const url = process.env.URL_DB

const client = new MongoClient(url)

const dbName = 'Project 0'

async function connectDB() {
  try {
    await client.connect()
    console.log('Conectado a Atlas')
  } catch (error) {
    console.log('Error al conectar a la base de datos', error)
  }
}

connectDB()
