import utils from '../utils'
import processStringParam from './string'
import processArrayParam from './array'

function processObjectParam(param) {// { mod, state, actions, id } or { mods: [ { ... }, mod ], id }

    let res
    const use = param.use // 使用缓存
    const mod = param.mod
    const mods = param.mods
    const id = param.id // 加入缓存

    if (use) { // 使用缓存
        utils.useCache(use)
    }

    if (mod && utils.isChildMod(mod) || utils.isRoot(mod)) {

        let stateMapList = param.state
        let actionMapList = param.actions
        const exclude = param.exclude

        if (exclude && utils.isPlainObject(exclude)) {
            const excludeState = exclude.state
            const excludeActions = exclude.actions
            if (Array.isArray(excludeState)) {
                const stateList = Object.keys(utils.getAllState(mod))
                const stateSet = new Set(stateList)
                excludeState.forEach(n => {
                    stateSet.delete(n)
                })
                stateMapList = Array.from(stateSet)
            }
            if (Array.isArray(excludeActions)) {
                const actionList = Object.keys(utils.getAllActions(mod))
                const actionSet = new Set(actionList)
                excludeActions.forEach(n => {
                    actionSet.delete(n)
                })
                actionMapList = Array.from(actionSet)
            }
        }

        if (utils.isEmptyArray(stateMapList) && utils.isEmptyArray(actionMapList)) { // { mod, id } id和mod指向同一块缓存 

            processStringParam(mod)

            utils.add2Cache(id, utils.getCache(mod))

        } else { // { mod, [state, actions, id, exclude] }

            res = {}

            if (Array.isArray(stateMapList)) {
                res.computed = { ...utils.iMapState(mod, stateMapList) }
            }
            if (Array.isArray(actionMapList)) {
                res.methods = { ...utils.iMapAction(mod, actionMapList) }
            }
            utils.add2Target(res)
            utils.add2Cache(id, res)
            utils.add2CachedGroup(res)
        }
    } else if (mods) { // { mods: [ { ... } ], id }

        if (id)
            utils.createCachedGroup()

        processArrayParam(mods)

        if (id) {
            utils.add2Cache(id, utils.getCachedGroup())
            utils.destroyCachedGroup()
        }
    }
}

export default processObjectParam