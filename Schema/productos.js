const z = require('zod')

const schemaRating = z.object({
  rate: z.number().positive().default(2.5),
  count: z.number().int().positive().default(100)
})

const schemaProducto = z.object({
  title: z.string(),
  price: z.number().positive(),
  description: z.string(),
  image: z.string().url(),
  rating: schemaRating,
  category: z.string()
})

function validateProducto(objeto) {
  return schemaProducto.safeParse(objeto)
}

// Función para validar parcialmente un elemento del recurso

function validatePartialProducto(objeto) {
  return schemaProducto.partial().safeParse(objeto)
}

module.exports = {
  validateProducto,
  validatePartialProducto
}
