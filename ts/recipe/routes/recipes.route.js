const express = require('express')

const { httpsGetRecipes, httpsGetRandomRecipe } = require('./recipes.controller')

const recipeRouter = express.Router()

recipeRouter.get('/', httpsGetRecipes)
recipeRouter.get('/random', httpsGetRandomRecipe)

module.exports = recipeRouter
