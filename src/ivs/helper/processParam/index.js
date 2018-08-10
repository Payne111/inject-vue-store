import utils from '../utils'
import processStringParam from './string'
import processObjectParam from './object'
import processArrayParam from './array'

function processParam(param) {
    if (typeof param == 'string') {
        processStringParam(param)
    } else if (utils.isPlainObject(param)) {
        processObjectParam(param)
    } else if (Array.isArray(param)) {
        processArrayParam(param)
    }
}

export default processParam