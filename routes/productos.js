import { Router } from 'express'
import { ControllerProducto } from '../controllers/productos.js'

export const routerProducto = Router()

routerProducto.get('/', ControllerProducto.getAll)
routerProducto.post('/', ControllerProducto.create)

routerProducto.get('/:id', ControllerProducto.getByID)
routerProducto.patch('/:id', ControllerProducto.update)
routerProducto.delete('/:id', ControllerProducto.delete)
