/*
 * @Description: 工具函数
 */


/**
 * url参数数据获取
 * ex:getURLParameters('http://url.com/page?name=Adam&surname=Smith'); output== {name: 'Adam', surname: 'Smith'}
 *  */
export const getURLParameters = url => (url.match(/([^?=&]+)(=([^&]*))/g)||[]).reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = decodeURIComponent(v.slice(v.indexOf('=') + 1))), a), {});

/**
 * url参数数据获取
 * ex:getQueryString('http://url.com/page?name=Adam&surname=Smith','name'); output== Adam
 *  */
export function getQueryString(url, key){
    if (!url) throw new Error('url is require');
    let r = getURLParameters(url);
    if (r[key]) return r[key];
    return null
}