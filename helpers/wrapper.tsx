import Router from "next/router";
import { authService } from "../services/auth";
import { Middleware } from "./middleware";
import axios from 'axios'

export const fetchWrapper = {
  get,
  post,
  //   put,
}

interface Values {
  username: string,
  password: string
}

async function get(url: string) {
  const requestOptions: Object = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', ...authHeader()
    }
  };
  return new Promise((success, reject) => {
    axios(url, requestOptions).then(function (response) {
      return success(response?.data.data)
    })
      .catch(function (error) {
        reject(error.data)
      })
  })


  // await axios(url, requestOptions).then((res: any) => res.data.data);
}

async function post(url: string | any, data: Values) {
  const requestOptions: Object = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data)
  };
  return await fetch(url, requestOptions).then(res => Middleware.handleResponse(res));
}

function authHeader() {
  const user: any = authService.userValue;
  const isLoggedIn = user && user._value.data;

  if (isLoggedIn) {
    return { Authorization: user._value.data };
  } else {
    return {};
  }
}