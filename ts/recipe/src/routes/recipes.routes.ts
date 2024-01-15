import RecipesController from '../controllers/RecipesController'
import RecipesInteractor from '../interactors/RecipesInteractor'
import recipes from '../model/recipes.mongo'
import RecipeRepository from '../repositories/RecipeRepository'

const express = require('express')

const repository = new RecipeRepository(recipes)
const interactor = new RecipesInteractor(repository)

const recipesController = new RecipesController(interactor)
const recipesRouter = express.Router()

recipesRouter.get('/', recipesController.getRecipesHandler.bind(recipesController))
recipesRouter.get('/random', recipesController.getRandomRecipeHandler.bind(recipesController))

export default recipesRouter
