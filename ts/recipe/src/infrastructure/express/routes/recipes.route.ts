import express from 'express'

import GetRecipes from '../../../usecases/getRecipes/GetRecipes'
import RecipesController from '../controllers/RecipesController'
import RecipesService from '../../../domain/services/RecipesService'
import GetRandomRecipe from '../../../usecases/getRandomRecipe/GetRandomRecipe'
import RecipesRepositoryImpl from '../../database/repository/RecipesRepositoryImpl'

const recipeRouter = express.Router()

const recipesRepository = new RecipesRepositoryImpl()
const recipeService = new RecipesService(recipesRepository)
const getRandomRecipeUseCase = new GetRandomRecipe(recipeService)
const getRecipesUseCase = new GetRecipes(recipeService)
const recipeController = new RecipesController({ getRandomRecipeUseCase, getRecipesUseCase })

recipeRouter.get('/', recipeController.getRecipesHandler.bind(recipeController))
recipeRouter.get('/random', recipeController.getRandomRecipeHandler.bind(recipeController))

export default recipeRouter
