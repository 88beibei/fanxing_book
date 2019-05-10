import axios from "axios";
import qs from 'qs';
import Cookies from 'js-cookie';
import router from "@/router/index";
import layer from 'vue-layer-mobile';
import { setSession, getSession } from "@/api/session";
import config from "../../config/index.js";
import product from "../../config/prod.env.js";
var codeMsg = {
        'A001': '成功',
        'A002': '失败',
        'A004': '输入数据异常',
        'A005': '无满足条件记录',
        'A006': '上链失败',
        'A007': '数据库操作异常',
        'A008': '服务器异常',
        'A009': '未登陆',
        'A010': '验签失败',
        'A011': '预支付失败',
        'A012': '解密无此记录',
        'A013': '手机号未知',
        'A014': '手机号格式错误',
        'A015': '验证码错误',
        'A016': '用户名或密码错误',
        'A017': '该手机号已被注册',
        'A018': '账号不存在，请重新注册',
        'A019': '验证码发送频繁，请稍后再试'
    }
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
    // token 已过期，重定向到登录页面
    // layerIndex && layer.close(layerIndex);
    var result = response.data;
    var code = result.code;
    // if (code == 'A001'){

    // }else{
    //     layer.toast(result.msg);
    // }
    return result;
}, function(error) {
    // Do something with response error
    console.dir(error);
    if (error.response.status == '403') {
        // Cookies.remove('userId');
        // setSession('callbackUrl', location.href);
        // router.push('/login');

    } else if (error.response.status != '200') {
        // layer.close(layerIndex);
        // layer.toast('系统繁忙');
    }
    return Promise.reject(error);
});
export default http;