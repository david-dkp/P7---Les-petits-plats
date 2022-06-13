import recipesModel from "../data/recipesModel.js"

class RecipesPresenter {
    #recipes = []

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
}

export default RecipesPresenter
