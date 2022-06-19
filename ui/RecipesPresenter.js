import recipesModel from "../data/recipesModel.js"
import { arrayEquals } from "../utils/arrayUtils.js"
import Observable from "../utils/Observable.js"
import { combineObservables } from "../utils/observableUtils.js"

class RecipesPresenter {
    #recipesObservable = new Observable([])
    recipesUiStatesObservable = new Observable([])

    filterChipsUiStatesObservable = new Observable([])

    #ingredientsSearchQueryObservable = new Observable("")
    #appliancesSearchQueryObservable = new Observable("")
    #ustensilsSearchQueryObservable = new Observable("")

    #ingredientsObservable = new Observable([])
    #appliancesObservable = new Observable([])
    #ustensilsObservable = new Observable([])

    ingredientsUiStatesObservable = new Observable([])
    appliancesUiStatesObservable = new Observable([])
    ustensilsUiStatesObservable = new Observable([])
    #searchQueryObservable = new Observable("")

    static getInstance() {
        if (!this.instance) {
            this.instance = new RecipesPresenter(recipesModel)
        }
        return this.instance
    }

    constructor(model) {
        this.model = model
        this.#getInitialData()

        combineObservables(
            [this.filterChipsUiStatesObservable, this.#searchQueryObservable],
            (filterChipsUiStates, searchQuery) => {
                this.loadRecipes()
            }
        )

        combineObservables(
            [this.#ingredientsSearchQueryObservable, this.#recipesObservable],
            (ingredientsSearchQuery, recipes) => {
                const ingredients = []
                recipes.forEach((recipe) => {
                    for (const ingredient of recipe.ingredients) {
                        if (
                            !ingredients.includes(ingredient.ingredient) &&
                            ingredient.ingredient.includes(
                                ingredientsSearchQuery
                            )
                        ) {
                            ingredients.push(ingredient.ingredient)
                        }
                    }
                })
                if (
                    !arrayEquals(
                        ingredients,
                        this.ingredientsUiStatesObservable.value
                    )
                ) {
                    this.ingredientsUiStatesObservable.notify(ingredients)
                }
            }
        )

        combineObservables(
            [this.#appliancesSearchQueryObservable, this.#recipesObservable],
            (appliancesSearchQuery, recipes) => {
                const appliances = []
                recipes.forEach((recipe) => {
                    if (
                        !appliances.includes(recipe.appliance) &&
                        recipe.appliance.includes(appliancesSearchQuery)
                    ) {
                        appliances.push(recipe.appliance)
                    }
                })
                if (
                    !arrayEquals(
                        appliances,
                        this.appliancesUiStatesObservable.value
                    )
                ) {
                    this.appliancesUiStatesObservable.notify(appliances)
                }
            }
        )

        combineObservables(
            [this.#ustensilsSearchQueryObservable, this.#recipesObservable],
            (ustensilsSearchQuery, recipes) => {
                const ustensils = []
                recipes.forEach((recipe) => {
                    for (const ustensil of recipe.ustensils) {
                        if (
                            !ustensils.includes(ustensil) &&
                            ustensil.includes(ustensilsSearchQuery)
                        ) {
                            ustensils.push(ustensil)
                        }
                    }
                })
                if (
                    !arrayEquals(
                        ustensils,
                        this.ustensilsUiStatesObservable.value
                    )
                ) {
                    this.ustensilsUiStatesObservable.notify(ustensils)
                }
            }
        )

        this.#recipesObservable.subscribe((recipes) => {
            this.recipesUiStatesObservable.notify(
                recipes.map((recipe) => this.#getRecipeItemUiState(recipe))
            )
        })
    }

    #getInitialData() {
        this.model.getRecipes().then((recipes) => {
            this.#recipesObservable.notify(recipes)
        })
        this.model.getIngredients().then((ingredients) => {
            this.#ingredientsObservable.notify(ingredients)
        })
        this.model.getAppliances().then((appliances) => {
            this.#appliancesObservable.notify(appliances)
        })
        this.model.getUstensils().then((ustensils) => {
            this.#ustensilsObservable.notify(ustensils)
        })
    }

    onRemoveFilterClick(filterChip) {
        const filterChipIndex =
            this.filterChipsUiStatesObservable.value.findIndex(
                (filterChipUiState) =>
                    filterChipUiState.type === filterChip.type &&
                    filterChipUiState.label === filterChip.label
            )

        if (filterChipIndex !== -1) {
            const newFilterChipsUiStates = [
                ...this.filterChipsUiStatesObservable.value.slice(
                    0,
                    filterChipIndex
                ),
                ...this.filterChipsUiStatesObservable.value.slice(
                    filterChipIndex + 1
                ),
            ]
            this.filterChipsUiStatesObservable.notify(newFilterChipsUiStates)
        }
    }

    onIngredientClick(ingredient) {
        const filterChipIndex =
            this.filterChipsUiStatesObservable.value.findIndex(
                (filterChipUiState) =>
                    filterChipUiState.type === "ingredient" &&
                    filterChipUiState.label === ingredient
            )
        if (filterChipIndex === -1) {
            this.filterChipsUiStatesObservable.notify([
                ...this.filterChipsUiStatesObservable.value,
                {
                    type: "ingredient",
                    label: ingredient,
                },
            ])
        }
    }

    onApplianceClick(appliance) {
        const filterChipIndex =
            this.filterChipsUiStatesObservable.value.findIndex(
                (filterChipUiState) =>
                    filterChipUiState.type === "appliance" &&
                    filterChipUiState.label === appliance
            )
        if (filterChipIndex === -1) {
            this.filterChipsUiStatesObservable.notify([
                ...this.filterChipsUiStatesObservable.value,
                {
                    type: "appliance",
                    label: appliance,
                },
            ])
        }
    }

    onUstensilClick(ustensil) {
        const filterChipIndex =
            this.filterChipsUiStatesObservable.value.findIndex(
                (filterChipUiState) =>
                    filterChipUiState.type === "ustensil" &&
                    filterChipUiState.label === ustensil
            )
        if (filterChipIndex === -1) {
            this.filterChipsUiStatesObservable.notify([
                ...this.filterChipsUiStatesObservable.value,
                {
                    type: "ustensil",
                    label: ustensil,
                },
            ])
        }
    }

    getFilterIngredients() {
        return this.filterChipsUiStatesObservable.value
            .filter(
                (filterChipUiState) => filterChipUiState.type === "ingredient"
            )
            .map((filterChipUiState) => filterChipUiState.label)
    }

    getFilterAppliances() {
        return this.filterChipsUiStatesObservable.value
            .filter(
                (filterChipUiState) => filterChipUiState.type === "appliance"
            )
            .map((filterChipUiState) => filterChipUiState.label)
    }

    getFilterUstensils() {
        return this.filterChipsUiStatesObservable.value
            .filter(
                (filterChipUiState) => filterChipUiState.type === "ustensil"
            )
            .map((filterChipUiState) => filterChipUiState.label)
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

    loadRecipes() {
        this.model
            .getRecipesWithFilter({
                ingredients: this.getFilterIngredients(),
                appliances: this.getFilterAppliances(),
                ustencils: this.getFilterUstensils(),
                searchQuery: this.#searchQueryObservable.value,
            })
            .then((recipes) => {
                this.#recipesObservable.notify(recipes)
            })
    }

    onSearchQueryChange(searchQuery) {
        this.#searchQueryObservable.notify(searchQuery)
    }

    onIngredientSearchQueryChange(searchQuery) {
        this.#ingredientsSearchQueryObservable.notify(searchQuery)
    }

    onApplianceSearchQueryChange(searchQuery) {
        this.#appliancesSearchQueryObservable.notify(searchQuery)
    }

    onUstensilSearchQueryChange(searchQuery) {
        this.#ustensilsSearchQueryObservable.notify(searchQuery)
    }
}

export default RecipesPresenter
