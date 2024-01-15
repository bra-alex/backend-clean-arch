import { AxiosStatic } from 'axios'
import { FilterQuery } from 'mongoose'
import Recipe from '../models/Recipes'
import RecipesRepository from '../repositories/RecipesRepository'

export default class DatabaseSeederService {
  private readonly axios: AxiosStatic
  private readonly recipesRepository: RecipesRepository
  constructor({
    axios,
    recipesRepository,
  }: {
    recipesRepository: RecipesRepository
    axios: AxiosStatic
  }) {
    this.axios = axios
    this.recipesRepository = recipesRepository
  }

  private async getLastId(): Promise<number> {
    const DEFAULT_ID = 0
    const id = await this.recipesRepository.findLast()

    if (!id) {
      return DEFAULT_ID
    }

    console.log(id.id)

    return id.id
  }

  private async saveRecipe(recipe: Recipe) {
    return await this.recipesRepository.save(recipe)
  }

  private async recipeExists(filter: FilterQuery<Recipe>) {
    return await this.recipesRepository.findOne(filter)
  }

  public async fetchRecipes() {
    const exists = await this.recipeExists({ id: 1 })

    if (exists) {
      console.error('Recipe Exists')
      return
    }

    const options = {
      method: 'GET',
      url: 'https://tasty.p.rapidapi.com/recipes/list',
      params: { from: '1', size: '9460' },
      headers: {
        'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
        'X-RapidAPI-Host': process.env.X_RapidAPI_Host,
      },
    }

    const response = await this.axios.request(options)

    if (response.status !== 200) {
      console.log(`Couldn't fetch recipes`)
      throw new Error('Error connecting to API')
    }

    const results = response.data.results

    for (const obj of results) {
      if (obj.recipes) {
        await this.hasEmbeddedRecipes(obj)
      } else {
        await this.hasRecipes(obj)
      }
    }
  }

  private async hasRecipes(obj: any) {
    let id = (await this.getLastId()) + 1
    let name = obj.name
    let image = obj.thumbnail_url
    let servings = obj.yields
    let timeTaken = obj.total_time_minutes ? `${obj.total_time_minutes} minutes` : 'N/A'
    let instructions = []
    let ingredients = []

    for (const instruction of obj.instructions) {
      instructions.push(instruction.display_text)
    }

    for (const section of obj.sections) {
      const sectionTitle = section.name
      const ingredient = []

      for (const component of section.components) {
        ingredient.push(component.raw_text)
      }

      ingredients.push({
        title: sectionTitle || 'Ingredients',
        ingredients: ingredient,
      })
    }

    const recipeData = {
      id,
      name,
      image,
      servings,
      timeTaken,
      instructions,
      ingredients,
    }

    const exists = await this.recipeExists({ name: recipeData.name })

    if (exists) {
      console.error('Recipe Exists')
      return
    }

    console.log(recipeData.name)
    console.log(recipeData.image)

    await this.saveRecipe(recipeData)
  }

  private async hasEmbeddedRecipes(obj: any) {
    let id
    let name
    let image
    let servings
    let timeTaken
    let instructions = []
    let ingredients = []

    for (const recipe of obj.recipes) {
      id = (await this.getLastId()) + 1
      name = recipe.name
      image = recipe.thumbnail_url
      servings = recipe.yields
      timeTaken = recipe.total_time_minutes ? `${recipe.total_time_minutes} minutes` : 'N/A'

      for (const instruction of recipe.instructions) {
        instructions.push(instruction.display_text)
      }

      for (const section of recipe.sections) {
        const sectionTitle = section.name
        const ingredient = []

        for (const component of section.components) {
          ingredient.push(component.raw_text)
        }

        ingredients.push({
          title: sectionTitle || 'Ingredients',
          ingredients: ingredient,
        })
      }

      const recipeData = {
        id,
        name,
        image,
        servings,
        timeTaken,
        instructions,
        ingredients,
      }

      const exists = await this.recipeExists({ name: recipeData.name })

      if (exists) {
        console.error('Recipe Exists')
        return
      }

      console.log(recipeData.name)
      console.log(recipeData.instructions)

      await this.saveRecipe(recipeData)

      instructions = []
      ingredients = []
    }
  }
}
