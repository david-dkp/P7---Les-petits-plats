import RecipesPresenter from "./RecipesPresenter.js"

class RecipesView {
    constructor(presenter) {
        this.presenter = presenter
        this.presenter.setView(this)
    }

    renderRecipes(recipes) {
        console.log(recipes)
    }
}

new RecipesView(RecipesPresenter.getInstance())
