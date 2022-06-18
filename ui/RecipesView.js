import RecipesPresenter from "./RecipesPresenter.js"
import { createRecipeElement, createFilterChip } from "./recipesFactories.js"

class RecipesView {
    #previous
    constructor(presenter) {
        this.recipesListElement = document.querySelector(".recipees-list")
        this.searchFiltersListElement = document.querySelector(
            ".search-filters-list"
        )
        this.dropdownIngredientsContainerElement = document.querySelector(
            ".dropdown-ingredients-container"
        )
        this.dropdownIngerdientsListElement = document.querySelector(
            ".dropdown-ingredients-list"
        )

        this.dropdownAppliancesContainerElement = document.querySelector(
            ".dropdown-appliances-container"
        )
        this.dropdownAppliancesListElement = document.querySelector(
            ".dropdown-appliances-list"
        )

        this.dropdownUstensilsContainerElement = document.querySelector(
            ".dropdown-ustensils-container"
        )
        this.dropdownUstensilsListElement = document.querySelector(
            ".dropdown-ustensils-list"
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

    renderIngredients(ingredients) {
        this.dropdownIngerdientsListElement.textContent = ""
        ingredients.forEach((ingredient) => {
            const ingredientItemElement = document.createElement("li")
            ingredientItemElement.classList.add("dropdown-list-item")
            ingredientItemElement.textContent = ingredient
            ingredientItemElement.addEventListener("click", () =>
                this.presenter.onIngredientClick(ingredient)
            )
            this.dropdownIngerdientsListElement.appendChild(
                ingredientItemElement
            )
        })
    }

    renderAppliances(appliances) {
        this.dropdownAppliancesListElement.textContent = ""
        appliances.forEach((appliance) => {
            const applianceItemElement = document.createElement("li")
            applianceItemElement.classList.add("dropdown-list-item")
            applianceItemElement.textContent = appliance
            applianceItemElement.addEventListener("click", () =>
                this.presenter.onApplianceClick(appliance)
            )
            this.dropdownAppliancesListElement.appendChild(applianceItemElement)
        })
    }

    renderUstensils(ustensils) {
        this.dropdownUstensilsListElement.textContent = ""
        ustensils.forEach((ustensil) => {
            const ustensilItemElement = document.createElement("li")
            ustensilItemElement.classList.add("dropdown-list-item")
            ustensilItemElement.textContent = ustensil
            ustensilItemElement.addEventListener("click", () =>
                this.presenter.onUstensilClick(ustensil)
            )
            this.dropdownUstensilsListElement.appendChild(ustensilItemElement)
        })
    }
}

new RecipesView(RecipesPresenter.getInstance())
