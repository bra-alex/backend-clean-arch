import Recipe from '../../domain/models/Recipes'

export default interface GetRandomRecipeOutput {
  recipe: Recipe | null
}
