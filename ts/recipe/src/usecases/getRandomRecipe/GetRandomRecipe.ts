import Recipe from '../../domain/models/Recipes'
import RecipesService from '../../domain/services/RecipesService'

export default class GetRandomRecipe {
  constructor(private readonly recipeService: RecipesService) {}

  async execute(): Promise<Recipe | null> {
    return this.recipeService.getRandomRecipe()
  }
}
