import mongoose from 'mongoose'
import RecipeEntity from '../entities/RecipeEntity'

const recipeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  timeTaken: String,
  ingredients: [
    {
      title: {
        type: String,
      },
      ingredients: {
        type: [String],
        required: true,
      },
    },
  ],
  instructions: {
    type: [String],
    required: true,
  },
  servings: {
    type: String,
    required: true,
  },
})

const recipes = mongoose.model<RecipeEntity>('Recipe', recipeSchema)

export default recipes
