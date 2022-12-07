import { authService } from "../services/auth";

export const Middleware = {
  handleResponse
};

function handleResponse(response: Object | string | any) {
  console.log(response);

  return response.text().then((text: string | null) => {
    const data = text && JSON.parse(text);
    console.log(response);


    if (!response.ok) {
      if ([401].includes(response.status) && authService.userValue) {
        // auto logout if 401 Unauthorized
        authService.logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    } else {
      return data;
    }
  });
}