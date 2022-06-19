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
    ingredients = ingredients.map((ingredient) => ingredient.toLowerCase())
    appliances = appliances.map((appliance) => appliance.toLowerCase())
    ustensils = ustensils.map((ustensil) => ustensil.toLowerCase())

    const searchQueryWords = searchQuery
        .trim()
        .split(" ")
        .map((word) => word.toLowerCase())

    const getRecipeIngredients = (recipe) => {
        return recipe.ingredients.map((ingredient) =>
            ingredient.ingredient.toLowerCase()
        )
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
        return ingredients.every((ingredient) =>
            getRecipeIngredients(recipe).includes(ingredient)
        )
    }

    const recipeHasAppliances = (recipe) => {
        return appliances.includes(recipe.appliance.toLowerCase())
    }

    const recipeHasUstensils = (recipe) => {
        return ustensils.every((ustensil) =>
            recipe.ustensils
                .map((ustensil) => ustensil.toLowerCase())
                .includes(ustensil)
        )
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
