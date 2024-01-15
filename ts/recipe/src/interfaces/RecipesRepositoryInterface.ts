import RecipeEntity from '../entities/RecipeEntity'

export default interface RecipesRepositoryInterface {
  findAll(): Promise<RecipeEntity[]>
  findRandom(): Promise<RecipeEntity | null>
}
