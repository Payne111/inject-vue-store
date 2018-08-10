class Cache {
    constructor() {
        this.body = {}
    }

    add(key, val) {
        this.body[key] = val
    }

    get(key) {
        return this.body[key]
    }
}

export default new Cache()