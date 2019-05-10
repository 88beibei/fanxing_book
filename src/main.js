import Vue from 'vue'
import App from './App'
import router from './router';
import './permission' 
import axios from "@/api/http";
// import { getLinkUrl } from '@/config';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI)


//请求
// Vue.config.productionTip = false;
Vue.prototype.$http = axios;


// var FastClick = require('fastclick');
// FastClick.attach(document.body);
document.documentElement.style.fontSize = Vue.prototype.$fontSize = document.documentElement.clientWidth / 3.75 + 'px';
Vue.prototype.$height = document.documentElement.clientHeight / parseInt(Vue.prototype.$fontSize);

// //弹窗部分
// import 'vue-layer-mobile/need/layer.css';
// import layer from 'vue-layer-mobile';
// Vue.use(layer);


import "@/style/font/iconfont.css";
import "@/style/font/iconfont.js";
// import "@/api/array";
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})