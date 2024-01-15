export default class RecipeEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly image: string,
    public readonly servings: string,
    public readonly instructions: string[],
    public readonly ingredients: Ingredients[],
    public readonly timeTaken?: string,
  ) {}
}
