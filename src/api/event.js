
'use strict';
var list = [];
export default {
    on: function(e, fn){
        list[e] = list[e] || [];
        list[e].push(fn);
    },
    emit: function(e){
        if(!Array.isArray(list[e]) || list[e].length < 1) return;
        for(let i = 0; i < list[e].length; i ++){
            list[e][i]();
        }
    }
}