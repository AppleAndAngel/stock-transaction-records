// import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store'
Vue.use(VueRouter);

/**各应用路由 */
import home from '../views/home/router'; // 操作视频

// const Login = () =>import('../components/Login');
// const TheError = () =>import('../components/404');
// const Crop = () =>import('../components/Crop');

const routes = matchRouter();

const router = new VueRouter({
    routes,
    scrollBehavior () {
        return { x: 0, y: 0 };
    },
});


// router.beforeEach((to, from, next) => {
//     let loginStatus = store.getters['global/loginStatus'];
//     if (!loginStatus && to.path!=='/login') {
//         // store.commit('global/mu_clearOut')
//         next({
//             fullPath: '/login',
//             path: '/login',
//             name: 'Login',
//             query: Object.assign({}, to.query, {
//                 backPath: to.path,
//             }),
//             replace: true,
//         });
//     } else {
//         next()
//     }
// });

/**
 * 路由处理（过滤和处理路由权限）
 * @param agentId
 * @param userIdentity
 * @returns {*[]}
 */
function matchRouter () {
    /**所有应用路由 */
    let allRouter = [
        ...home.router,
    ];

    // todo.. userIdentity
    // routerList = allRouter.filter(itm => itm.meta.agentId === Number(agentId));
    store.commit('global/mu_setRouterList', allRouter);
    let routes = [
        {
            name: 'Index',
            path: '/',
            redirect: '/home',
            // alias: '/login',
            meta: {
                home: true,
            },
        },
        ...allRouter,
        // {
        //     name: 'Login',
        //     path: '/login',
        //     // alias: '/login',
        //     component: Login,
        //     meta: {
        //         home: true,
        //     },
        // },
        // {
        //     name: 'Crop',
        //     path: '/crop1',
        //     component: Crop,
        //     redirect:'/crop1/home/index',
        //     meta: {
        //     },
        //     children: allRouter,
        // },
        // {
        //     name: '404',
        //     path: '/*',
        //     component: TheError,
        //     meta: {
        //     },
        // },
    ];
    return routes

}
export default router;
