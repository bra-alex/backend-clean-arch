import Recipe from '../../../domain/models/Recipes'
import RecipesRepository from '../../../domain/repositories/RecipesRepository'
import RecipeModel from '../mongo/models/RecipeModel'

export default class RecipesRepositoryImpl implements RecipesRepository {
  async findLast(): Promise<Recipe | null> {
    return await RecipeModel.findOne().sort('-id')
  }

  async findOne(filter: Recipe): Promise<Recipe | null> {
    return await RecipeModel.findOne(filter)
  }

  async save(recipe: Recipe): Promise<Recipe | null> {
    return await RecipeModel.findOneAndUpdate({ name: recipe.name }, recipe, { upsert: true })
  }

  async findAll(): Promise<Recipe[]> {
    return await RecipeModel.find(
      {},
      {
        _id: 0,
        __v: 0,
      },
    )
  }

  async findRandom(): Promise<Recipe | null> {
    const documentCount = await RecipeModel.countDocuments({})
    const randID = Math.floor(Math.random() * documentCount + 1)

    return await RecipeModel.findOne(
      { id: randID },
      {
        _id: 0,
        __v: 0,
      },
    )
  }
}
