import mongoose from 'mongoose'
import RecipeEntity from '../entities/RecipeEntity'
import RecipesRepositoryInterface from '../interfaces/RecipesRepositoryInterface'

export default class RecipeRepository implements RecipesRepositoryInterface {
  constructor(private readonly recipes: mongoose.Model<RecipeEntity>) {
    this.recipes = recipes
  }

  async findAll(): Promise<RecipeEntity[]> {
    return await this.recipes.find(
      {},
      {
        _id: 0,
        __v: 0,
      },
    )
  }

  async findRandom(): Promise<RecipeEntity | null> {
    const documentCount = await this.recipes.countDocuments({})
    const randID = Math.floor(Math.random() * documentCount + 1)

    return await this.recipes.findOne(
      { id: randID },
      {
        _id: 0,
        __v: 0,
      },
    )
  }
}
