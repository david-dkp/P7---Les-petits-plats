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
    for (const word of array) {
        if (string.indexOf(word) !== -1) {
            return true
        }
    }
    return false
}
