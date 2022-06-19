export const removeDuplicates = (array) => {
    return array.filter((item, index) => array.indexOf(item) === index)
}

export const arrayEquals = (a, b) => {
    return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
    )
}

export const stringContainsArrayWords = (string, array) => {
    return array.some((word) => string.includes(word))
}

export const arrayIsEmpty = (array) => {
    return !array || array.length === 0
}
