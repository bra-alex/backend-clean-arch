import { FilterQuery } from 'mongoose'
import recipes from '../model/recipes.mongo'

export default function getRecipe(query: FilterQuery<typeof recipes>) {
  if (Object.keys(query).length === 0) {
    return {}
  }

  const reg = new RegExp(query.name, 'i')
  return { name: reg }
}
