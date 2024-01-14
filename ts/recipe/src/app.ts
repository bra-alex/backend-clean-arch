import helmet from 'helmet'
import express from 'express'

const app = express()

import recipeRouter from './routes/recipes.route'

app.use(helmet())

app.use(express.json())

app.use('/recipes', recipeRouter)
app.use('/', (_req, res) => {
  res.redirect('/recipes')
})

// app.use((error, req, res, next) => {
//   if (!error.status) {
//     error.status = 500
//   }
//   res.status(error.status).json({
//     message: 'Error',
//     error: error.message,
//   })
// })

export default app
