import { Router } from 'express'
// import { ControllerProducto } from '../controllers/productos.js' para usar el controlador con archivos JSON
import { ControllerProductoMongo } from '../controllers/productosMongo.js'

export const routerProducto = Router()

routerProducto.get('/', ControllerProductoMongo.getAll)
routerProducto.post('/', ControllerProductoMongo.create)

routerProducto.get('/:id', ControllerProductoMongo.getByID)
routerProducto.patch('/:id', ControllerProductoMongo.update)
routerProducto.delete('/:id', ControllerProductoMongo.delete)
