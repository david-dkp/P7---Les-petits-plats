class Observable {
    constructor(value) {
        this.value = value
        this.listeners = []
    }

    subscribe(callback) {
        this.listeners.push(callback)
        callback(this.value)
    }

    unsubscribe(callback) {
        this.listeners = this.listeners.filter(
            (listener) => listener !== callback
        )
    }

    notify(newValue) {
        this.value = newValue
        this.listeners.forEach((listener) => listener(newValue))
    }
}

export default Observable
