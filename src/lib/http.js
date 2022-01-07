import { get, post } from './axios';
import axios from './axios';
import qs from 'qs';

const appDomain = '';
class Http {
    constructor(opts = {}) {
        return this.fetch(Object.entries(opts));
    }

    fetch (opts) {
        opts.forEach(([key, val]) => {
            let url = !/^http/.test(val.url) ? appDomain + val.url : val.url;
            let params = {
                url: url,
                options: val.options || { headers: axios.defaults.headers },
            };
            if (val.method.toUpperCase() === 'GET') {
                this[key] = (data, opt) => this._get(Object.assign(params, opt && {url: opt.url, options: opt.options } || {}, { data }));
            } else if (val.method.toUpperCase() === 'POST') {
                this[key] = (data, opt) => this._post(Object.assign(params, opt && {url: opt.url, options: opt.options } || {}, { data }));
            }
        });
    }

    _get ({ url, data, options }) {
        return get(url, data, options);
    }

    _post ({ url, data, options }) {
        let contentType = options.headers && options.headers['Content-Type'] || axios.defaults.headers['Content-Type'];
        if (data && /form/.test(contentType)) {
            data = qs.stringify(data);
        }
        return post(url, data, options);
    }

}

export default Http;