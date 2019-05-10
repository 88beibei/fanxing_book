var setSession = function(key, value){
    sessionStorage.setItem(key, value);
}
var getSession = function(key){
    return sessionStorage.getItem(key);
}
var rmSession = function(key){
    sessionStorage.removeItem(key);
}
export { setSession, getSession, rmSession };