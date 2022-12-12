import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'
import Cookies from "js-cookie";

import { fetchWrapper } from '../helpers';

const url = "http://localhost:81/api"
const userSubject = new BehaviorSubject(process.browser && typeof window !== "undefined" && localStorage.getItem('user') !== null && localStorage.getItem('user') !== undefined && localStorage.getItem('user'))

interface Values {
    username: string,
    password: string
}

export const authService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject },
    login,
    logout
};

function login(data: Values) {
    return fetchWrapper.post(`${url}/login`, undefined, data).then(res => {
        userSubject.next(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        Cookies.set("token", res?.data?.data)
        Router.push("/");

        return res;
    });
}

function logout() {

    localStorage.removeItem('user');
    Cookies.remove('token')
    userSubject.next(null);
    Router.push('/account/login');
}

// function getAll() {
//     return fetchWrapper.get(baseUrl);
// }
