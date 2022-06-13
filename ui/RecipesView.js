import RecipesPresenter from "./RecipesPresenter.js"
import { createRecipeElement, createFilterChip } from "./recipesFactories.js"

class RecipesView {
    constructor(presenter) {
        this.recipesListElement = document.querySelector(".recipees-list")
        this.searchFiltersListElement = document.querySelector(
            ".search-filters-list"
        )

        this.presenter = presenter
        this.presenter.setView(this)
    }

    renderRecipes(recipes) {
        this.recipesListElement.textContent = ""
        recipes.forEach((recipe) => {
            const recipeItemElement = createRecipeElement(recipe)
            this.recipesListElement.appendChild(recipeItemElement)
        })
    }

    renderFilterChips(filterChips) {
        this.searchFiltersListElement.textContent = ""
        filterChips.forEach((filterChip) => {
            const filterChipElement = createFilterChip({
                ...filterChip,
                onRemoveFilterClick: () =>
                    this.presenter.onRemoveFilterClick(filterChip),
            })
            this.searchFiltersListElement.appendChild(filterChipElement)
        })
    }
}

new RecipesView(RecipesPresenter.getInstance())
