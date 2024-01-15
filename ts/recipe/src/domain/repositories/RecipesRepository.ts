import { FilterQuery } from 'mongoose'
import Recipe from '../models/Recipes'

export default abstract class RecipesRepository {
  abstract findAll(): Promise<Recipe[]>
  abstract findRandom(): Promise<Recipe | null>
  abstract findOne(filter: FilterQuery<Recipe>): Promise<Recipe | null>
  abstract save(recipe: Recipe): Promise<Recipe | null>
  abstract findLast(): Promise<Recipe | null>
}
