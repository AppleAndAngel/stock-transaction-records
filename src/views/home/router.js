const Index = () => import(/* webpackChunkName: "home" */ './Index.vue');

export default {
    router: [
        {
            path: '/home',
            name: 'home',
            component: Index,
            meta: {
                title:'操作视频',
            },
        },
    ],
    components: {
        Index,
    },
};
