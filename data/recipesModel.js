import recipes from "../assets/recipes.js"
import { stringContainsArrayWords, arrayIsEmpty } from "../utils/arrayUtils.js"

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
    ustencils,
    searchQuery,
}) => {
    const searchQueryWords = searchQuery.trim().split(" ")
    const recipeHasSearchQuery = (recipe) => {
        return stringContainsArrayWords(recipe.name, searchQueryWords)
    }
    const recipeHasIngredients = (recipe) => {
        return ingredients.every((ingredient) =>
            recipe.ingredients.includes(ingredient)
        )
    }

    const recipeHasAppliances = (recipe) => {
        return appliances.includes(recipe.appliance)
    }

    const recipeHasUstensils = (recipe) => {
        return ustencils.every((ustensil) =>
            recipe.ustencils.includes(ustensil)
        )
    }

    const validators = [recipeHasSearchQuery]
    if (!arrayIsEmpty(ingredients)) {
        validators.push(recipeHasIngredients)
    }
    if (!arrayIsEmpty(appliances)) {
        validators.push(recipeHasAppliances)
    }
    if (!arrayIsEmpty(ustencils)) {
        validators.push(recipeHasUstensils)
    }

    return actualRecipes.filter((recipe) => {
        return validators.every((validator) => validator(recipe))
    })
}

export default {
    getRecipes,
    getRecipesWithFilter,
    getAppliances,
    getIngredients,
    getUstensils,
}
