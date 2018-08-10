import init from './helper/init'
import processParam from './helper/processParam'
import share from './helper/share'
function injectVueStore(store) {
    init(store)
    return function (option) {
        if (!option.injected && option.ivs) {
            if (!option.mixins) {
                option.mixins = []
            }
            share.targetMixins = option.mixins
            processParam(option.ivs)
            option.injected = true
        }
    }
}

export default injectVueStore
