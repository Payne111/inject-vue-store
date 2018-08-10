# inject-vue-store

> 更简单便捷使用vuex

## 引入

```js
import Vue from 'vue'
// 必须配合 VueInitInterceptor 使用
import VueInitInterceptor from 'vue-init-interceptor'
import injectVueStorePlugin from 'inject-vue-store'
// vuex store 实例
import store from './store'

new VueInitInterceptor(Vue, [
  injectVueStorePlugin(store)
])

```

## 在组件中使用

```js
// 字符串型参数
// 注入该模块下所有的state和actions
export default {
    ivs: 'moduleName', // 模块名，如果是根模块传入 $root
    data() {
        return {}
    }
}

// 对象型参数1
export default {
    ivs: {
        mod: 'moduleName', // [必须] 模块名 
        state: ['someState'], // [可选] state 数组
        actions: ['someAction'], // [可选] action 数组
        id: 'cacheId' // [可选] 把该模块存入缓存，之后创建的组件可通过传入 {use: 'cacheId'} 直接使用 
    },
    data() {
        return {}
    }
}

// 对象型参数2
export default {
    ivs: {
        mods: [ 
            'moduleName',
            {
                mod: 'moduleName', 
                state: ['someState'], 
                actions: ['someAction'], 
                id: 'cacheId'
            },
        ],
        id: 'cacheId' // 把整个mods存入缓存
    },
    data() {
        return {}
    }
}

// 数组型参数
export default {
    ivs: [
        'moduleName',
        {
            mod: 'moduleName', 
            state: ['someState'], 
            actions: ['someAction'], 
            id: 'cacheId' 
        }
    ],
    data() {
        return {}
    }
}
```

