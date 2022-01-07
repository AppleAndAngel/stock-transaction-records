/**
 * 全局vuex
 */

export default {
    namespaced: true,
    state: {
        loginInfo: (() => {
            let p = storage['persistent'].get('loginInfo') || {};
            return p;
        })(),
        routerList: (() => {
            let p = storage['session'].get('routerList') || [];
            return p;
        })(),
        loginStatus: (() => {
            let p = storage['persistent'].get('loginInfo');
            return p !== null && JSON.stringify(p) !== '{}';
        })(),
    },
    getters: {
        loginInfo: (state) => {
            return state.loginInfo;
        },
        routerList: (state) => {
            return state.routerList;
        },
        loginStatus: (state) => {
            return state.loginStatus;
        },
    },
    mutations: {
        mu_setloginInfo (state, data) {
            state.loginInfo = data;
            state.loginStatus = true;//授权成功存在导购信息修改登录态
            storage['persistent'].set('loginInfo', data);
        },
        mu_setRouterList (state, data) {
            state.routerList = data;
            storage['session'].set('routerList', data);
        },
        mu_setLoginStatus (state, data) {
            state.loginStatus = data;
        },
        mu_clearOut (state, data) {
            storage['persistent'].clear();
            storage['session'].clear();
        },
    },
    actions: {
        act_loginOut: function ({ commit, state, getters, dispatch, rootGetters }, data) {
        },

    },
};
