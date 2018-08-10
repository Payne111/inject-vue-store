import processParam from './index'
function processArrayParam(param) {
    for (let i = 0; i < param.length; i++) {
        processParam(param[i])
    }
}

export default processArrayParam