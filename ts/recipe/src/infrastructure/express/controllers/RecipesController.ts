import { NextFunction, Request, Response } from 'express'
import GetRandomRecipe from '../../../usecases/getRandomRecipe/GetRandomRecipe'
import GetRecipes from '../../../usecases/getRecipes/GetRecipes'

export default class RecipesController {
  private readonly getRecipesUseCase: GetRecipes
  private readonly getRandomRecipeUseCase: GetRandomRecipe

  constructor({
    getRandomRecipeUseCase,
    getRecipesUseCase,
  }: {
    getRecipesUseCase: GetRecipes
    getRandomRecipeUseCase: GetRandomRecipe
  }) {
    this.getRecipesUseCase = getRecipesUseCase
    this.getRandomRecipeUseCase = getRandomRecipeUseCase
  }

  async getRecipesHandler(_req: Request, res: Response, next: NextFunction) {
    try {
      const recipes = await this.getRecipesUseCase.execute()

      return res.status(200).json(recipes)
    } catch (error) {
      return next(error)
    }
  }

  async getRandomRecipeHandler(_req: Request, res: Response, next: NextFunction) {
    try {
      const recipe = await this.getRandomRecipeUseCase.execute()

      return res.status(200).json(recipe)
    } catch (error) {
      return next(error)
    }
  }
}
