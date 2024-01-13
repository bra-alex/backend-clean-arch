
function getRecipe(query){
    if (Object.keys(query).length === 0){
        return {}
    }
    
    const reg = new RegExp(query.name, 'i')
    return {name: reg}
}

module.exports = {
    getRecipe
}