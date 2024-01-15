import { FilterQuery } from 'mongoose'
import RecipeModel from '../infrastructure/database/mongo/models/RecipeModel'

export default function getRecipe(query: FilterQuery<typeof RecipeModel>) {
  if (Object.keys(query).length === 0) {
    return {}
  }

  const reg = new RegExp(query.name, 'i')
  return { name: reg }
}
