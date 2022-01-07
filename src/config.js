import axios from './lib/axios';

window.APIURL = ''; // 接口访问地址
if (process.env.NODE_ENV == 'development') {
    //本地开发
    window.APIURL = '';
}else if (process.env.NODE_ENV == 'production') {
    //上线打包环境区分
    if (process.env.VUE_APP_TITLE === 'dev') {
        window.APIURL = '';
    } else if (process.env.VUE_APP_TITLE === 'test') {
        window.APIURL = '';

    } else {
        window.APIURL = '';
    }
}
axios.defaults.baseURL = window.APIURL;

// window.baseURL = process.baseURL = ``;//dev环境 线上图片baseURL + path
