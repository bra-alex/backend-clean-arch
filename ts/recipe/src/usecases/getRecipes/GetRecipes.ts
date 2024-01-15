import Recipe from '../../domain/models/Recipes'
import RecipesService from '../../domain/services/RecipesService'

export default class GetRecipes {
  constructor(private readonly recipesService: RecipesService) {}

  async execute(): Promise<Recipe[]> {
    return this.recipesService.getRecipes()
  }
}
