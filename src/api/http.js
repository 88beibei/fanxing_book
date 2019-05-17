import axios from "axios";
import qs from 'qs';

import router from "@/router/index";
import { logout } from "@/api/auth";
import { Toast } from "mint-ui";

//config.dev.proxyTable['/api'].target
var http = axios.create({
    // baseURL: process.env.NODE_ENV == 'production' ? '' : '/api',
    timeout: 60000
});
var layerIndex = null;
//请求拦截
http.interceptors.request.use(
    config => {
        var type = config.headers['Content-Type'];
        if (!type || type != 'multipart/form-data') {
            // config.data = qs.stringify(config.data);
            // if (config.method == 'post') { layerIndex = layer.open({ type: 2 }); }
        }
        // config.headers['userPhone'] = Cookies.get('userId');
        // config.headers['webToken'] = localStorage.getItem('webToken');
        return config;
    },
    function(error) {
        console.log(error);
        return Promise.reject(error);
    }
);
//响应拦截
http.interceptors.response.use(function(response) {
    const result = response.data;
    const code = result.bstatus.code;
    if (code !== 0) {
        if (code == 1001) {
            // return result; //后注释掉
            console.log('未登录');
            logout();
            return result;
            // location.reload();
            // store.dispatch('FedLogOut').then(() => {
            //     location.reload();
            // })
        } else {
            return Promise.reject(result.bstatus.msg || result.bstatus.desc);
        }
        return Promise.reject(res.head.rm);
    } else {
        return result;
    }

}, function(error) {
    return Promise.reject('网络异常！');
});
export default {
    post(url, params, hasFailTip = true) {
        return http.post(url, params).then(res => {
            // console.log('res' + JSON.stringify(res))
            return res;
        }, err => {
            if (hasFailTip) {
                // alert(111)
                Toast(err);
            }
            return Promise.reject(err);
        })
    }
}