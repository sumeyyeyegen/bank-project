import { authService } from "../services/auth";

const requestOptions: Object = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json', ...authHeader()
  }
}

function getToken() {
  const user: any = authService.userValue;
  const isLoggedIn = user && user._value.data;

  console.log(user);


  if (isLoggedIn) {
    console.log(user._value.data);

    return user._value.data
  } else {
    return ""
  }
}

function authHeader() {
  const user: any = authService.userValue;
  const isLoggedIn = user && user._value.data;

  if (isLoggedIn) {
    console.log(user._value.data);

    return { Authorization: user._value.data };
  } else {
    return {};
  }
}

export { requestOptions, authHeader, getToken }