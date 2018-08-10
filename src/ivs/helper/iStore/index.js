function rootStateFilter(state, modules) {
    let rootState = {}
    for (let key in state) {
        if (!modules[key]) {
            rootState[key] = state[key]
        }
    }
    return rootState
}

class IStore {
    constructor() {
        this.root = null
        this.modules = null
        this.rootActions = null
        this.rootState = null
    }

    create(store) {
        this.root = store._modules.root
        this.modules = this.root._children
        this.rootActions = this.root._rawModule.actions
        this.rootState = rootStateFilter(this.root._rawModule.state, this.modules)
    }
}

export default new IStore()