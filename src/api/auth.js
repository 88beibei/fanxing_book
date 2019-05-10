import Cookies from 'js-cookie';

const logout = function () {
    Cookies.remove('token');
    Cookies.remove('userinfo');
}
const getToken = function () {
    return !!Cookies.get('token');
}

const setSession = function (key, val) {
    return Cookies.set(key, val);
}
const getSession = function (key) {
    return Cookies.get(key);
}
export { logout, getToken, setSession, getSession };