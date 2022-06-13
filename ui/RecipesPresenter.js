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

    static getInstance() {
        if (!this.instance) {
            this.instance = new RecipesPresenter(recipesModel)
        }
        return this.instance
    }

    constructor(model) {
        this.model = model
    }

    setView(view) {
        this.view = view
        this.#getInitialRecipes()
        this.view.renderFilterChips(this.#filterChipsUiStates)
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

    #getInitialRecipes() {
        this.model
            .getRecipes()
            .then((recipes) => {
                this.#recipes = recipes
                this.view.renderRecipes(
                    this.#recipes.map(this.#getRecipeItemUiState)
                )
            })
            .catch((error) => {
                console.log(error)
            })
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
