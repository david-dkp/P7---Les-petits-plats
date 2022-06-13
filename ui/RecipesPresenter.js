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

    #getInitialRecipes() {
        this.model
            .getRecipes()
            .then((recipes) => {
                this.#recipes = recipes
                this.view.renderRecipes(this.#recipes)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export default RecipesPresenter
