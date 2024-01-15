import RecipeEntity from '../entities/RecipeEntity'
import RecipesInteractorInterface from '../interfaces/RecipesInteractorInterface'
import RecipesRepositoryInterface from '../interfaces/RecipesRepositoryInterface'

export default class RecipesInteractor implements RecipesInteractorInterface {
  constructor(private readonly repository: RecipesRepositoryInterface) {
    this.repository = repository
  }

  async getRecipes(): Promise<RecipeEntity[]> {
    return await this.repository.findAll()
  }
  async getRandomRecipe(): Promise<RecipeEntity | null> {
    return await this.repository.findRandom()
  }
}
