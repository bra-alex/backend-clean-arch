// const fs = require('fs')
import http from 'http'

require('dotenv').config()

import app from './app'

import { connectMongo } from './services/mongo'

const PORT = process.env.PORT

const server = http.createServer(app)

server.listen(PORT, async () => {
  console.log('Server running')

  await connectMongo()
  // await fetchRecipes()
})
