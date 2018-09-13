import constant from '../constant'
import iStore from '../iStore'
import share from '../share'
import cache from '../cache'
import { mapState, mapActions } from "vuex";

function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

function isEmptyArray(arr) {
    return !arr || arr.length === 0
}

function warn(msg) {
    msg = `[IVS WARN]: ${msg} -> from:`
    console.warn(msg, share.target)
}

/**
 * 根模块
 * @param {String} mod 
 */
function isRoot(mod) {
    return mod === constant.ROOT_MOUDLE
}

/**
 * 子模块
 * @param {String} mod
 */
function isChildMod(mod) {
    return iStore.modules[mod]
}

function iMapState(mod, list) {
    let res
    if (isRoot(mod)) {
        res = mapState(list)
    } else {
        res = mapState(mod, list)
    }
    return res
}

function iMapAction(mod, list) {
    let res
    if (isRoot(mod)) {
        res = mapActions(list)
    } else {
        res = mapActions(mod, list)
    }
    return res
}

function hasCache(id) {
    return !!cache.get(id)
}

function getCache(id) {
    return cache.get(id)
}

function useCache(id) {
    if (hasCache(id)) {
        const res = getCache(id)
        if (Array.isArray(res)) {
            for (let i = 0; i < res.length; i++) {
                share.targetMixins.push(res[i])
            }
        } else {
            share.targetMixins.push(res)
        }
    } else {
        warn(`要使用的缓存 ${id} 不存在`)
    }
}

function add2Cache(id, res) {
    if (id) {
        if (hasCache(id)) {
            warn(`缓存 ${id} 已存在`)
        } else {
            cache.add(id, res)
        }
    }
}

/**
 * 加入mixins
 * @param {Object} res
 */
function add2Target(res) {
    share.targetMixins.push(res)
}

/**
 * 加入待缓存队列
 * @param {Object} res 
 */
function add2CachedGroup(res) {
    if (share.cachedGroup) {
        share.cachedGroup.push(res)
    }
}

/**
 * 建立待缓存队列
 */
function createCachedGroup() {
    share.cachedGroup = []
}

/**
 * 销毁缓存队列
 */
function destroyCachedGroup() {
    share.cachedGroup = null
}

/**
 * 获取缓存队列
 */
function getCachedGroup() {
    return share.cachedGroup
}

function getAllState(mod) {
    let res
    if (isRoot(mod)) {
        res = iStore.rootState
    } else {
        res = iStore.modules[mod].state
    }
    return res
}

function getAllActions(mod) {
    let res
    if (isRoot(mod)) {
        res = iStore.rootActions
    } else {
        res = iStore.modules[mod]._rawModule.actions
    }
    return res
}

export default {
    isPlainObject,
    isEmptyArray,
    warn,
    isRoot,
    isChildMod,
    iMapState,
    iMapAction,
    hasCache,
    getCache,
    useCache,
    add2Target,
    add2CachedGroup,
    createCachedGroup,
    destroyCachedGroup,
    getCachedGroup,
    add2Cache,
    getAllState,
    getAllActions
}