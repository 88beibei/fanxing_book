import Cookies from 'js-cookie';

const logout = function () {
    Cookies.remove('token');
    Cookies.remove('userinfo');
}
const getToken = function () {
    return !!Cookies.get('token');
}
export { logout, getToken };