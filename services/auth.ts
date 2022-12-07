import Router from "next/router";
import { fetchWrapper } from "../helpers/wrapper";
import { BehaviorSubject } from 'rxjs';

const url = "http://localhost:81/api"

var userSubject=  new BehaviorSubject(process.browser && typeof window !== "undefined"&&localStorage.getItem('user')!==null&&localStorage.getItem('user')!==undefined&& JSON.parse(localStorage.getItem('user')||""));

export const authService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject },
    login,
    logout
};

interface Values {
  username: string,
  password: string
}

async function login(data: Values) {
  console.log(data);
  
    // let d = { data: { username: data.username, password: data.password } }

    // const response = await fetch("http://localhost:81/api/login", {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });

    // const json = await response.json();
    return fetchWrapper.post(`${url}/login`,data).then(res =>{
       localStorage.setItem("user",JSON.stringify(res))
       return res;
    })
  }

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}  