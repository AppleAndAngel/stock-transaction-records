// import Vue from 'vue'
import Vuex from 'vuex'
import { createNamespacedHelpers } from 'vuex'
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import global from './modules/global'` it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './global.js' => 'global'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default;
    return modules
}, {})

const store = new Vuex.Store({
    modules,
})
export { createNamespacedHelpers };
export default store