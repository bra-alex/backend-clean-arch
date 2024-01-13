// const { getRecipe } = require('../services/query')
const { getRecipes, getRandomRecipe } = require('../model/recipes.model')


async function httpsGetRecipes(req, res, next) {
    try {
        // const query = getRecipe(req.query)
        const recipes = await getRecipes()

        return res.status(200).json(recipes)
    } catch (e) {
        next(e)
    }
}

async function httpsGetRandomRecipe(req, res, next) {
    try {
        const recipe = await getRandomRecipe()
        const ingredients = recipe.ingredients.flatMap(ingredient => ingredient.ingredients).join('\n')
        const instructions = recipe.instructions.join('\n')

        return res.status(200).json({
            id: recipe.id,
            name: recipe.name,
            image: recipe.image,
            servings: recipe.servings,
            ingredients,
            timeTaken: recipe.timeTaken,
            instructions
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    httpsGetRecipes,
    httpsGetRandomRecipe
}