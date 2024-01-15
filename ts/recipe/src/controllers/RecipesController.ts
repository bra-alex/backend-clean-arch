import { Request, Response, NextFunction } from 'express'
import RecipesInteractorInterface from '../interfaces/RecipesInteractorInterface'

export default class RecipesController {
  constructor(private readonly interactor: RecipesInteractorInterface) {
    this.interactor = interactor
  }

  async getRecipesHandler(_req: Request, res: Response, next: NextFunction) {
    try {
      // const query = getRecipe(req.query)
      const recipes = await this.interactor.getRecipes()

      return res.status(200).json(recipes)
    } catch (e) {
      return next(e)
    }
  }

  async getRandomRecipeHandler(_req: Request, res: Response, next: NextFunction) {
    try {
      const recipe = await this.interactor.getRandomRecipe()

      return res.status(200).json(recipe)
    } catch (e) {
      return next(e)
    }
  }
}
