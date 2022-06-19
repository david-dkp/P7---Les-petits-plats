import recipes from "../assets/recipes.js"
import { stringContainsArrayWords } from "../utils/arrayUtils.js"

let actualRecipes = recipes

const getIngredients = async () => {
    const ingredients = []
    for (const recipe of actualRecipes) {
        for (const ingredient of recipe.ingredients) {
            if (!ingredients.includes(ingredient.ingredient)) {
                ingredients.push(ingredient.ingredient)
            }
        }
    }
    return ingredients
}

const getAppliances = async () => {
    const appliances = []
    for (const recipe of actualRecipes) {
        if (!appliances.includes(recipe.appliance)) {
            appliances.push(recipe.appliance)
        }
    }
    return appliances
}

const getUstensils = async () => {
    const ustensils = []
    for (const recipe of actualRecipes) {
        for (const ustensil of recipe.ustensils) {
            if (!ustensils.includes(ustensil)) {
                ustensils.push(ustensil)
            }
        }
    }
    return ustensils
}

const getRecipes = async () => {
    return actualRecipes
}

const getRecipesWithFilter = async ({
    ingredients,
    appliances,
    ustensils,
    searchQuery,
}) => {
    return actualRecipes
}

export default {
    getRecipes,
    getRecipesWithFilter,
    getAppliances,
    getIngredients,
    getUstensils,
}
