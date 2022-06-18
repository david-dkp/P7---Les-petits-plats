import recipesModel from "../data/recipesModel.js"

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
    }
}

export default RecipesPresenter
