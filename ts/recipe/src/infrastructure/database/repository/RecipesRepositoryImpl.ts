import Recipe from '../../../domain/models/Recipes'
import RecipesRepository from '../../../domain/repositories/RecipesRepository'
import RecipeModel from '../mongo/models/RecipeModel'

export default class RecipesRepositoryImpl implements RecipesRepository {
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
