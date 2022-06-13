export const createRecipeElement = ({
    name,
    timeText,
    ingredients,
    description,
}) => {
    const recipeCardItemElement = document.createElement("li")
    recipeCardItemElement.classList.add("recipe-card-item")

    const recipeImageElement = document.createElement("img")
    recipeImageElement.classList.add("recipe-image")
    recipeImageElement.src = "https://via.placeholder.com/150"
    recipeCardItemElement.appendChild(recipeImageElement)

    const recipeInfosContainerElement = document.createElement("div")
    recipeInfosContainerElement.classList.add("recipe-infos-container")

    const recipeInfosHeaderElement = document.createElement("div")
    recipeInfosHeaderElement.classList.add("recipe-infos-header")

    const recipeNameElement = document.createElement("h3")
    recipeNameElement.classList.add("recipe-name")
    recipeNameElement.textContent = name

    const recipeDurationContainerElement = document.createElement("div")
    recipeDurationContainerElement.classList.add("recipe-duration-container")

    const clockIconElement = document.createElement("i")
    clockIconElement.classList.add("fa-solid", "fa-clock")

    const recipeDurationTextElement = document.createElement("p")
    recipeDurationTextElement.classList.add("recipe-duration-text")
    recipeDurationTextElement.textContent = timeText

    recipeDurationContainerElement.appendChild(clockIconElement)
    recipeDurationContainerElement.appendChild(recipeDurationTextElement)

    recipeInfosHeaderElement.appendChild(recipeNameElement)
    recipeInfosHeaderElement.appendChild(recipeDurationContainerElement)

    const recipeInfosDetailsElement = document.createElement("div")
    recipeInfosDetailsElement.classList.add("recipe-infos-details")

    const recipeIngredientsListElement = document.createElement("ul")
    recipeIngredientsListElement.classList.add("recipe-ingredients-list")

    ingredients.forEach((ingredient) => {
        const ingredientItemElement = document.createElement("li")
        ingredientItemElement.classList.add("recipe-ingredient-item")

        const ingredientNameElement = document.createElement("span")
        ingredientNameElement.classList.add("recipe-ingredient-name")
        ingredientNameElement.textContent = ingredient.ingredient + ": "

        ingredientItemElement.appendChild(ingredientNameElement)
        ingredientItemElement.append(ingredient.quantity + "" + ingredient.unit)

        recipeIngredientsListElement.appendChild(ingredientItemElement)
    })

    recipeInfosDetailsElement.appendChild(recipeIngredientsListElement)

    const recipeDescriptionElement = document.createElement("p")
    recipeDescriptionElement.classList.add("recipe-description")
    recipeDescriptionElement.textContent = description

    recipeInfosDetailsElement.appendChild(recipeDescriptionElement)

    recipeInfosContainerElement.appendChild(recipeInfosHeaderElement)
    recipeInfosContainerElement.appendChild(recipeInfosDetailsElement)

    recipeCardItemElement.appendChild(recipeInfosContainerElement)

    return recipeCardItemElement
}
