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
    ustensils,
    searchQuery,
}) => {
    const searchQueryWords = searchQuery
        .trim()
        .split(" ")
        .map((word) => word.toLowerCase())

    const getRecipeIngredients = (recipe) => {
        const recipeIngredients = []
        for (const ingredient of recipe.ingredients) {
            recipeIngredients.push(ingredient.ingredient.toLowerCase())
        }
        return recipeIngredients
    }

    const recipeHasSearchQuery = (recipe) => {
        return (
            stringContainsArrayWords(
                recipe.name.toLowerCase(),
                searchQueryWords
            ) ||
            stringContainsArrayWords(
                recipe.description.toLowerCase(),
                searchQueryWords
            ) ||
            stringContainsArrayWords(
                getRecipeIngredients(recipe).join(" ").toLowerCase(),
                searchQueryWords
            )
        )
    }
    const recipeHasIngredients = (recipe) => {
        const recipeIngredients = getRecipeIngredients(recipe)
        for (const ingredient of ingredients) {
            if (!recipeIngredients.includes(ingredient.toLowerCase())) {
                return false
            }
        }
        return true
    }

    const recipeHasAppliances = (recipe) => {
        return appliances.includes(recipe.appliance)
    }

    const recipeHasUstensils = (recipe) => {
        for (const ustensil of ustensils) {
            if (!recipe.ustensils.includes(ustensil)) {
                return false
            }
        }
        return true
    }
    const validators = [recipeHasSearchQuery]
    if (!arrayIsEmpty(ingredients)) {
        validators.push(recipeHasIngredients)
    }
    if (!arrayIsEmpty(appliances)) {
        validators.push(recipeHasAppliances)
    }
    if (!arrayIsEmpty(ustensils)) {
        validators.push(recipeHasUstensils)
    }

    const filteredRecipes = []

    for (const recipe of actualRecipes) {
        let valid = true
        for (const validator of validators) {
            if (!validator(recipe)) {
                valid = false
                break
            }
        }
        if (valid) {
            filteredRecipes.push(recipe)
        }
    }

    return filteredRecipes
}

export default {
    getRecipes,
    getRecipesWithFilter,
    getAppliances,
    getIngredients,
    getUstensils,
}
