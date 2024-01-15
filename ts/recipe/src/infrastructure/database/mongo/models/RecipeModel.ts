import mongoose from 'mongoose'
import Recipe from '../../../../domain/models/Recipes'

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

const RecipeModel = mongoose.model<Recipe>('Recipe', recipeSchema)

export default RecipeModel
