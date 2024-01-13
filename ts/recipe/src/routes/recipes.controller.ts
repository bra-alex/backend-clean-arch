// const { getRecipe } = require('../services/query')
import { NextFunction, Request, Response } from 'express'
import { getRecipes, getRandomRecipe } from '../model/recipes.model'

async function httpsGetRecipes(_req: Request, res: Response, next: NextFunction) {
  try {
    // const query = getRecipe(req.query)
    const recipes = await getRecipes()

    return res.status(200).json(recipes)
  } catch (e) {
    return next(e)
  }
}

async function httpsGetRandomRecipe(_req: Request, res: Response, next: NextFunction) {
  try {
    const recipe = await getRandomRecipe()
    const ingredients = recipe?.ingredients.flatMap(ingredient => ingredient.ingredients).join('\n')
    const instructions = recipe?.instructions.join('\n')

    return res.status(200).json({
      id: recipe?.id,
      name: recipe?.name,
      image: recipe?.image,
      servings: recipe?.servings,
      ingredients,
      timeTaken: recipe?.timeTaken,
      instructions,
    })
  } catch (e) {
    return next(e)
  }
}

export { httpsGetRecipes, httpsGetRandomRecipe }
