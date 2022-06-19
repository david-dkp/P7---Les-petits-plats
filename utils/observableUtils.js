export const combineObservables = (observables, callback) => {
    const values = observables.map((observable) => observable.value)
    observables.forEach((observable, index) => {
        observable.subscribe((newValue) => {
            values[index] = newValue
            callback(...values)
        })
    })
}
