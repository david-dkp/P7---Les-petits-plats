import recipesModel from "../data/recipesModel.js"
import { removeDuplicates } from "../utils/arrayUtils.js"

class RecipesPresenter {
    #recipes = []
    #filterChipsUiStates = [
        {
            type: "ingredient",
            label: "Coco",
        },
        {
            type: "appliance",
            label: "Four",
        },
        {
            type: "ustensil",
            label: "Spoon",
        },
        {
            type: "ingredient",
            label: "Milk",
        },
    ]
    #ingredientsList = []
    #appliancesList = []
    #ustensilsList = []
    #searchQuery = ""

    static getInstance() {
        if (!this.instance) {
            this.instance = new RecipesPresenter(recipesModel)
        }
        return this.instance
    }

    constructor(model) {
        this.model = model
        this.#getInitialData()
    }

    #getInitialData() {
        this.model.getRecipes().then((recipes) => {
            this.#setRecipes(recipes)
        })
        this.model.getIngredients().then((ingredients) => {
            this.#setIngredients(ingredients)
        })
        this.model.getAppliances().then((appliances) => {
            this.#setAppliances(appliances)
        })
        this.model.getUstensils().then((ustensils) => {
            this.#setUstensils(ustensils)
        })
    }

    async setView(view) {
        this.view = view
        this.view.renderFilterChips(this.#filterChipsUiStates)
        this.view.renderRecipes(this.#recipes.map(this.#getRecipeItemUiState))
    }

    #setRecipes(recipes) {
        this.#recipes = recipes
        this.view.renderRecipes(this.#recipes.map(this.#getRecipeItemUiState))
        this.changeFiltersListForRecipes(recipes)
    }

    #setIngredients(ingredientsList) {
        this.#ingredientsList = ingredientsList
        this.view.renderIngredients(this.#ingredientsList)
    }

    #setAppliances(appliancesList) {
        this.#appliancesList = appliancesList
        this.view.renderAppliances(this.#appliancesList)
    }

    #setUstensils(ustensilsList) {
        this.#ustensilsList = ustensilsList
        this.view.renderUstensils(this.#ustensilsList)
    }

    #getRecipeItemUiState(recipe) {
        return {
            id: recipe.id,
            name: recipe.name,
            timeText: recipe.time + ` min${recipe.time > 1 ? "s" : ""}`,
            ingredients: recipe.ingredients.map((ingredient) => ({
                ingredient: ingredient.ingredient,
                quantity: ingredient.quantity,
                unit: ingredient.unit || "",
            })),
            description: recipe.description,
        }
    }

    onRemoveFilterClick(filterChip) {
        const filterChipIndex = this.#filterChipsUiStates.findIndex(
            (filterChipUiState) =>
                filterChipUiState.type === filterChip.type &&
                filterChipUiState.label === filterChip.label
        )
        if (filterChipIndex !== -1) {
            this.#filterChipsUiStates.splice(filterChipIndex, 1)
            this.view.renderFilterChips(this.#filterChipsUiStates)
        }
        this.loadRecipes()
    }

    onIngredientClick(ingredient) {
        const filterChipIndex = this.#filterChipsUiStates.findIndex(
            (filterChipUiState) =>
                filterChipUiState.type === "ingredient" &&
                filterChipUiState.label === ingredient
        )
        if (filterChipIndex === -1) {
            this.#filterChipsUiStates.push({
                type: "ingredient",
                label: ingredient,
            })
            this.view.renderFilterChips(this.#filterChipsUiStates)
        } else {
            return
        }

        this.loadRecipes()
    }

    onApplianceClick(appliance) {
        const filterChipIndex = this.#filterChipsUiStates.findIndex(
            (filterChipUiState) =>
                filterChipUiState.type === "appliance" &&
                filterChipUiState.label === appliance
        )
        if (filterChipIndex === -1) {
            this.#filterChipsUiStates.push({
                type: "appliance",
                label: appliance,
            })
            this.view.renderFilterChips(this.#filterChipsUiStates)
        } else {
            return
        }

        this.loadRecipes()
    }

    onUstensilClick(ustensil) {
        const filterChipIndex = this.#filterChipsUiStates.findIndex(
            (filterChipUiState) =>
                filterChipUiState.type === "ustensil" &&
                filterChipUiState.label === ustensil
        )
        if (filterChipIndex === -1) {
            this.#filterChipsUiStates.push({
                type: "ustensil",
                label: ustensil,
            })
            this.view.renderFilterChips(this.#filterChipsUiStates)
        } else {
            return
        }

        this.loadRecipes()
    }

    getFilterIngredients() {
        return this.#filterChipsUiStates
            .filter(
                (filterChipUiState) => filterChipUiState.type === "ingredient"
            )
            .map((filterChipUiState) => filterChipUiState.label)
    }

    getFilterAppliances() {
        return this.#filterChipsUiStates
            .filter(
                (filterChipUiState) => filterChipUiState.type === "appliance"
            )
            .map((filterChipUiState) => filterChipUiState.label)
    }

    getFilterUstensils() {
        return this.#filterChipsUiStates
            .filter(
                (filterChipUiState) => filterChipUiState.type === "ustensil"
            )
            .map((filterChipUiState) => filterChipUiState.label)
    }

    loadRecipes() {
        this.model
            .getRecipesWithFilter({
                ingredients: this.getFilterIngredients(),
                appliances: this.getFilterAppliances(),
                ustencils: this.getFilterUstensils(),
                searchQuery: this.#searchQuery,
            })
            .then((recipes) => {
                this.#setRecipes(recipes)
            })
    }

    changeFiltersListForRecipes(recipes) {
        const ingredients = []
        const appliances = []
        const ustensils = []
        recipes.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
                if (!ingredients.includes(ingredient.ingredient)) {
                    ingredients.push(ingredient.ingredient)
                }
            })
            if (!appliances.includes(recipe.appliance)) {
                appliances.push(recipe.appliance)
            }

            recipe.ustensils.forEach((ustensil) => {
                if (!ustensils.includes(ustensil)) {
                    ustensils.push(ustensil)
                }
            })
        })
        this.#setIngredients(ingredients)
        this.#setAppliances(appliances)
        this.#setUstensils(ustensils)
    }

    onSearchQueryChange(searchQuery) {
        console.log(searchQuery)
        this.#searchQuery = searchQuery
        this.loadRecipes()
    }
}

export default RecipesPresenter
