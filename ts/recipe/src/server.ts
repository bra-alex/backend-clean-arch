import http from 'http'
import axios from 'axios'

require('dotenv').config()

import app from './app'
import { connectMongo } from './infrastructure/database'
import DatabaseSeederService from './domain/services/DatabaseSeederService'
import RecipesRepositoryImpl from './infrastructure/database/repository/RecipesRepositoryImpl'

const PORT = process.env.PORT

const server = http.createServer(app)

const recipesRepository = new RecipesRepositoryImpl()
const seeder = new DatabaseSeederService({ recipesRepository, axios })

server.listen(PORT, async () => {
  console.log(`Server running on`, PORT)

  await connectMongo()
  await seeder.fetchRecipes()
  // await fetchRecipes()
})
