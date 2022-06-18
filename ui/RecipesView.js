import RecipesPresenter from "./RecipesPresenter.js"
import { createRecipeElement, createFilterChip } from "./recipesFactories.js"

class RecipesView {
    recipesListElement = document.querySelector(".recipees-list")
    searchFiltersListElement = document.querySelector(".search-filters-list")
    dropdownIngredientsContainerElement = document.querySelector(
        ".dropdown-ingredients-container"
    )
    dropdownIngerdientsListElement = document.querySelector(
        ".dropdown-ingredients-list"
    )

    dropdownAppliancesContainerElement = document.querySelector(
        ".dropdown-appliances-container"
    )
    dropdownAppliancesListElement = document.querySelector(
        ".dropdown-appliances-list"
    )

    dropdownUstensilsContainerElement = document.querySelector(
        ".dropdown-ustensils-container"
    )
    dropdownUstensilsListElement = document.querySelector(
        ".dropdown-ustensils-list"
    )

    dropdownButtonIngredientsElement = document.querySelector(
        ".dropdown-button-ingredients"
    )
    dropdownButtonAppliancesElement = document.querySelector(
        ".dropdown-button-appliances"
    )
    dropdownButtonUstensilsElement = document.querySelector(
        ".dropdown-button-ustensils"
    )

    dropdownContentIngredientsElement = document.querySelector(
        ".dropdown-content-ingredients"
    )
    dropdownContentAppliancesElement = document.querySelector(
        ".dropdown-content-appliances"
    )
    dropdownContentUstensilsElement = document.querySelector(
        ".dropdown-content-ustensils"
    )
    searchInputElement = document.querySelector(".search-input input")

    #currentDropdown = null

    constructor(presenter) {
        this.presenter = presenter
        this.presenter.setView(this)

        this.dropdownButtonIngredientsElement.addEventListener("click", () => {
            this.showDropdown({
                dropdownContainerElement:
                    this.dropdownIngredientsContainerElement,
                dropdownContentElement: this.dropdownContentIngredientsElement,
            })
        })

        this.dropdownButtonAppliancesElement.addEventListener("click", () => {
            this.showDropdown({
                dropdownContainerElement:
                    this.dropdownAppliancesContainerElement,
                dropdownContentElement: this.dropdownContentAppliancesElement,
            })
        })

        this.dropdownButtonUstensilsElement.addEventListener("click", () => {
            this.showDropdown({
                dropdownContainerElement:
                    this.dropdownUstensilsContainerElement,
                dropdownContentElement: this.dropdownContentUstensilsElement,
            })
        })

        const closeDropDownIconsElement = document.querySelectorAll(
            ".close-dropdown-button"
        )
        closeDropDownIconsElement.forEach((icon) => {
            icon.addEventListener("click", () => {
                this.hideDropdown(this.#currentDropdown)
            })
        })

        this.searchInputElement.addEventListener("keyup", (e) => {
            this.presenter.onSearchQueryChange(e.target.value)
        })
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

    showDropdown(dropdown) {
        if (this.#currentDropdown) this.hideDropdown(this.#currentDropdown)
        this.#currentDropdown = dropdown
        const { dropdownContainerElement, dropdownContentElement } = dropdown
        dropdownContentElement.setAttribute("aria-expanded", "true")
        dropdownContentElement.style.display = "flex"
        dropdownContainerElement.style.width =
            dropdownContentElement.clientWidth + "px"
    }

    hideDropdown(dropdown) {
        const { dropdownContainerElement, dropdownContentElement } = dropdown
        dropdownContentElement.style.display = "none"
        dropdownContentElement.setAttribute("aria-expanded", "false")
        dropdownContainerElement.style.width = "auto"

        this.#currentDropdown = null
    }
}

new RecipesView(RecipesPresenter.getInstance())
