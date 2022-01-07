import axios from 'axios';

// 请求超时时间
axios.defaults.timeout = 10000;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
const PassErrorCode = [0,1, 1002]; // 不拦截的errorCode


// 请求拦截器
axios.interceptors.request.use(
    config => {
        const token = '';
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    },
);

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200 || response.status === 304) {
            if(!PassErrorCode.includes(response.data.errcode)) {
                response.data.errmsg = '系统异常，请联系管理员！！！';
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况    
    error => {
        let response = { 'status': -404, 'statusText': '本地网络错误' };
        return Promise.reject(error.response || response);
    },
);

/**
 * 响应format
 * @param response
 * @param format
 * @returns {{errcode: (*|number), data: *, errmsg: (string|*)}|{errcode: (number|string), data: *, statusText: (string|*|string), errmsg: string}|*}
 */
function responseFormat (response, format = false) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304)) {
        if (format && (response.data.errcode || response.data.code)) {
            return {
                errcode: response.data.errcode || responseCodeFormat(response.data.code),
                errmsg: response.data.errmsg || response.data.msg,
                data: response.data.data || response.data.data,
            };
        } else {
            return response.data;
        }
    }

    // 异常状态下，保持格式统一
    return {
        errcode: response.status,
        errmsg: '请检查网络或稍后重试(' + response.status + ')',
        statusText: response.statusText,
        data: response.data,
    };
}

function responseCodeFormat (code) {
    // 代表成功的code 统一返回 0
    let errcode = ['0', 0, 200, '200'];
    if (errcode.includes(code)){
        return 0
    }
    return code
}

export function get (url, params, options={}) {
    let send = {
        method: 'get',
        url,
        params: params,
        headers: options.headers,
        cancelToken: new axios.CancelToken(function executor (c) {
            // executor 函数接收一个 cancel 函数作为参数
            typeof options.setCancel === 'function' && options.setCancel(c);
        }),
        responseType: options.responseType || 'json',
    };
    return axios(send).then(
        (response) => {
            return responseFormat(response, true);
        },
    );
}

export function post (url, data, options={}) {
    let send = {
        method: 'post',
        url,
        data: data,
        headers: options.headers,
        cancelToken: new axios.CancelToken(function executor (c) {
            // executor 函数接收一个 cancel 函数作为参数
            typeof options.setCancel === 'function' && options.setCancel(c);
        }),
        responseType: options.responseType || 'json',
    };

    return axios(send).then(
        (response) => {
            return responseFormat(response, true);
        },
    );
}

export function upload (url, formData, options) {
    let send = {
        timeout: options.timeout || 30000, // 上传默认30秒
        method: 'post',
        url,
        data: formData,
        headers: Object.assign({}, options.headers, { 'Content-Type': 'multipart/form-data' }),
        // `onUploadProgress` 允许为上传处理进度事件
        onUploadProgress: function (progressEvent) {
            typeof options.onUploadProgress === 'function' && options.onUploadProgress(progressEvent);
            // Do whatever you want with the native progress event
        },
        cancelToken: new axios.CancelToken(function executor (c) {
            // executor 函数接收一个 cancel 函数作为参数
            typeof options.setCancel === 'function' && options.setCancel(c);
        }),
    };
    return axios(send).then(
        (response) => {
            return responseFormat(response);
        },
    );
}

export default axios;
