import Recipe from '../models/Recipes'

export default abstract class RecipesRepository {
  abstract findAll(): Promise<Recipe[]>
  abstract findRandom(): Promise<Recipe | null>
}
