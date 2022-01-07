// import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './config'; // 项目配置
import './utils/storage'; // storage封装
import router from './router/index'; // 路由()
import store from './store' // vux
import VueBus from 'vue-bus';
// process.env.NODE_ENV === 'development'
if(true) {
    require('./views/home/interfaces/mockManage.js')
}


Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === 'development';
Vue.use(window.ELEMENT);
Vue.use(VueBus);
Object.assign(Vue.prototype.$ELEMENT, {
    size: 'medium',
    zIndex: 3000,
});
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
