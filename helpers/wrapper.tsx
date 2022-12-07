import { authService } from "../services/auth";
import { Middleware } from "./middleware";

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
    headers: { 'Content-Type': 'application/json', ...authHeader() }
  };
  return await fetch(url, requestOptions).then(res => res);
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
  const isLoggedIn = user && user.data;
  if (isLoggedIn) {
    return { Authorization: user.data };
  } else {
    return {};
  }
}