import Recipe from '../models/Recipes'
import RecipesRepository from '../repositories/RecipesRepository'

export default class RecipesService {
  constructor(private readonly recipeRepository: RecipesRepository) {}
  async getRecipes(): Promise<Recipe[]> {
    return await this.recipeRepository.findAll()
  }
  async getRandomRecipe(): Promise<Recipe | null> {
    return await this.recipeRepository.findRandom()
  }
}
