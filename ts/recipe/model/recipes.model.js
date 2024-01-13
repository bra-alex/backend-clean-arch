const axios = require('axios')
const recipes = require('./recipes.mongo');

const DEAULT_ID = 0

const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/list',
    params: { from: '1', size: '9460' },
    headers: {
        'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
        'X-RapidAPI-Host': process.env.X_RapidAPI_Host
    }
};

async function getRecipes() {
    try {
        return await recipes.find({}, {
            _id: 0,
            __v: 0,
        })
    } catch (err) {
        console.log(err);
        const e = new Error(err)
        e.status = 500
        e.message = 'Error getting recipes from the database'
        throw e
    }
}

async function getRandomRecipe() {
    try {
        const documentCount = await recipes.countDocuments({})
        const randID = Math.floor(Math.random() * documentCount + 1)

        return await recipes.findOne({ id: randID }, {
            _id: 0,
            __v: 0,
        })
    } catch (err) {
        console.log(err);
        const e = new Error(err)
        e.status = 500
        e.message = 'Error getting recipes from the database'
        throw e
    }
}

async function hasEmbeddedRecipes(obj) {
    try {
        let id
        let name
        let image
        let servings
        let timeTaken
        let instructions = []
        let ingredients = []

        for (const recipe of obj.recipes) {
            id = await getLastId() + 1
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
                    ingredients: ingredient
                })
            }

            const recipeData = {
                id,
                name,
                image,
                servings,
                timeTaken,
                instructions,
                ingredients
            }

            const exists = await recipeExists({ name: recipeData.name })

            if (exists) {
                console.error('Recipe Exists')
                return
            }

            console.log(recipeData.name)
            console.log(recipeData.instructions)

            await saveRecipe(recipeData)

            instructions = []
            ingredients = []
        }
    } catch (e) {
        const err = new Error('Error saving recipe')
        err.status = 500

        throw err
    }
}

async function hasRecipes(obj) {
    try {
        let id = await getLastId() + 1
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
                ingredients: ingredient
            })
        }

        const recipeData = {
            id,
            name,
            image,
            servings,
            timeTaken,
            instructions,
            ingredients
        }

        const exists = await recipeExists({ name: recipeData.name })

        if (exists) {
            console.error('Recipe Exists')
            return
        }

        console.log(recipeData.name)
        console.log(recipeData.image)

        await saveRecipe(recipeData)
    } catch (e) {
        const err = new Error('Error saving recipe')
        err.status = 500

        throw err
    }
}

async function fetchRecipes() {
    try {
        const response = await axios.request(options)

        if (response.status !== 200) {
            console.log(`Couldn't fetch recipes`)
            throw new Error('Error connecting to API')
        }

        const results = response.data.results

        const exists = await recipeExists({ id: 1 })

        if (exists) {
            console.error('Recipe Exists')
            return
        }

        for (const obj of results) {
            if (obj.recipes) {
                await hasEmbeddedRecipes(obj)
            } else {
                await hasRecipes(obj)
            }
        }
    } catch (e) {
        const err = new Error('Error fetching recipe')
        err.status = 500

        throw err
    }
}

async function getLastId() {
    try {
        const id = await recipes
            .findOne()
            .sort('-id')

        if (!id) {
            return DEAULT_ID
        }

        console.log(id.id)

        return id.id
    } catch (e) {
        const err = new Error('Error fetching id')
        err.status = 500

        throw err
    }
}

async function recipeExists(filter) {
    try {
        return await recipes.findOne(filter)
    } catch (e) {
        const err = new Error('Error finding recipe')
        err.status = 500

        throw err
    }
}

async function saveRecipe(recipe) {
    try {
        await recipes.findOneAndUpdate(
            { name: recipe.name },
            recipe,
            { upsert: true }
        )
        console.log("saved")
    } catch (e) {
        console.error(e)
        const err = new Error('Error saving recipe')
        err.status = 500

        throw err
    }
}

module.exports = {
    getRecipes,
    fetchRecipes,
    getRandomRecipe
}