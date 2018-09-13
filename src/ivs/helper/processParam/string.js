import utils from '../utils'
import cache from '../cache'

function processStringParam(mod) {

    if (mod) {

        if (!utils.hasCache(mod)) { // 先存入缓存

            let state = null, actions = null

            if (utils.isRoot(mod) || utils.isChildMod(mod)) { // 确保模块存在
                state = utils.getAllState(mod)
                actions = utils.getAllActions(mod)
            } else {
                return
            }

            const stateMapList = Object.keys(state)

            const actionMapList = Object.keys(actions)

            let ret = {
                computed: { ...utils.iMapState(mod, stateMapList) },
                methods: { ...utils.iMapAction(mod, actionMapList) }
            }
            utils.add2Cache(mod, ret)
        }

        utils.add2Target(utils.getCache(mod))

        utils.add2CachedGroup(utils.getCache(mod))
    }
}

export default processStringParam