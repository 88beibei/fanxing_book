
'use strict';


import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";
import http from "@/api/http";
import { heightUrl, amountUrl, tokenUrl, timeUrl } from "@/config/index";
Vue.use(Vuex);
import { getSession, setSession } from "@/api/auth";
var state = {
    token: getSession('token'),
    userId: Cookies.get('userId'),
    height: null,
    amount: 0,
    time: null, //预计上链时间,
    scrollTop: 0,
    hasPwd: Boolean(Cookies.get('hasPwd')),
    showShare: false
}


var mutations = {
    SET_TOKEN(state, token){
        setSession('token', token);
        state.token = token;
    },
    SET_USERID(state, userId){
        Cookies.set('userId', userId);
        state.userId = userId;
    },
    SET_HEIGHT(state, height){
        state.height = height;
    },
    SET_AMOUNT(state, amount){
        state.amount = amount;
    },
    SET_TIME(state, time){
        state.time = time;
    },
    SET_SCROLLTOP(state, scrollTop){
        state.scrollTop = scrollTop;
    },
    SET_HASPWD(state, hasPwd){
        Cookies.set('hasPwd', hasPwd);
        state.hasPwd = hasPwd;
    },
    SET_SHOWSHARE(state, showShare){
        state.showShare = showShare;
    }
}


var getters = {
    userId(state){
        return state.userId
    },
    token(state){
        return state.token;
    }
}

var actions = {
    getToken({ commit }, { userId, token, force }){
        if(!userId || (!force && userId && token)) return;
        http.get(tokenUrl, { params: { userId } }).then(({code, data}) => {
            commit("SET_TOKEN", data.token);
        });
    },
    getHeight({ commit }){
        http.get(heightUrl).then(({ code, data}) => {
            commit("SET_HEIGHT", data);
        });
    },
    getAmount({ commit }){
        http.get(amountUrl).then(({ code, data}) => {
            commit("SET_AMOUNT", data);
        });
    },
    getTime({ commit }, amount){
        http.get(timeUrl, { params: { amount }}).then(({ code, data}) => {
            commit("SET_TIME", data);
        });
    },
    setUserId({ commit }, userId){
        commit("SET_USERID", userId);
    },
    setScrollTop({ commit }, scrollTop){
        commit("SET_SCROLLTOP", scrollTop);
    },
    setShowShare({ commit }, showShare){
        commit('SET_SHOWSHARE', showShare);
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});


