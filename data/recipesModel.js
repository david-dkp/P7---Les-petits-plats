import recipes from "../assets/recipes.js"

let actualRecipes = recipes

const getRecipes = async () => {
    return actualRecipes
}

const getRecipesWithFilter = async ({
    ingredients,
    appliances,
    ustencils,
    searchQuery,
}) => {
    return actualRecipes
}

export default {
    getRecipes,
    getRecipesWithFilter,
}
