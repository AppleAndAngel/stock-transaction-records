import http from '@lib/http';

let apis = new http({
    getUserInfo: {
        url: '',
        method: 'get',
    },
    getShoppingGuideInfo: {
        url: '',
        method: 'post',
        options: {
            headers: { 'Content-Type': 'application/json' },
        },
    },
});
export default apis;
