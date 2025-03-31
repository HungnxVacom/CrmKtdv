String.prototype.endsWith = function (s) {
    return this.length >= s.length && this.substr(this.length - s.length) == s;
};
const SERVER_BASE_URL = import.meta.env.VITE_APP_API_URL;
const baseUrl = SERVER_BASE_URL[SERVER_BASE_URL.length - 1] === '/' ? SERVER_BASE_URL.substring(0, SERVER_BASE_URL.length - 1) : SERVER_BASE_URL;
export const BASE_REQUEST_URL = baseUrl;

export const USER_LOGIN_END_POINT = baseUrl.concat('/User/Login');

export const CUSTOMER_GROUP_GET_END_POINT = baseUrl.concat('/api/CustomerGroup')