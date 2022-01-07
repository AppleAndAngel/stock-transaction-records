/**
 * 系统 && 业务vuex
 */

export default {
    namespaced: true,
    state: {
        test: (() => {
            let p = storage['persistent'].get('test') || {};
            return p;
        })(),
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
};
