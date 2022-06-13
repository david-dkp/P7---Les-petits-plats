import RecipesPresenter from "./RecipesPresenter.js"
import { createRecipeElement } from "./recipesFactories.js"

class RecipesView {
    constructor(presenter) {
        this.presenter = presenter
        this.presenter.setView(this)
        this.recipesListElement = document.querySelector(".recipees-list")
    }

    renderRecipes(recipes) {
        this.recipesListElement.textContent = ""
        recipes.forEach((recipe) => {
            const recipeItemElement = createRecipeElement(recipe)
            this.recipesListElement.appendChild(recipeItemElement)
        })
    }
}

new RecipesView(RecipesPresenter.getInstance())
