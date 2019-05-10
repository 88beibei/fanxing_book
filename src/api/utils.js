
'use strict';
var timer = null;
export var timing = function(json, doing, done){
    clearInterval(timer);
    json.disTime = json.disTime < 1000 ? json.disTime * 1000 : json.disTime;
    (typeof doing == 'function') && doing(json.maxTime);
    timer = setInterval(function(){
        json.maxTime -= json.disTime / 1000;
        (typeof doing == 'function') && doing(json.maxTime);
        if(json.maxTime <= 0){
            clearInterval(timer);
            (typeof done == 'function') && done();
        }
    }, json.disTime || 1000);
}


export var isEmptyObject = function(obj){
    for(var i in obj){
        if(i) { return false; }
    }
    return true;
}

