import RecipeEntity from '../entities/RecipeEntity'

export default interface RecipesInteractorInterface {
  getRecipes(): Promise<RecipeEntity[]>
  getRandomRecipe(): Promise<RecipeEntity | null>
}
