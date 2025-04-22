import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse } from "@/api/services/types/commonTypes.js";

export const client = (() => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      Accept: "application/json, text/plain, */*",
    },
  });
})();

interface ApiError {
  status: string;
  errors: string[] | string;
}

const request = async <T>(options: AxiosRequestConfig): Promise<T> => {
  const onSuccess = (response: AxiosResponse<T>) => {
    const { data } = response;
    return data;
  };

  const onError = function (error: AxiosError<ApiError>) {
    const serverResponse = error.response?.data;
    if (serverResponse) {
      console.log(serverResponse?.errors);
      const errorPromise = new Error(error.message, {
        cause: {
          status: serverResponse?.status ?? "Unknown status",
          errors: serverResponse?.errors ?? ["Unknown error"],
        },
      });
      return Promise.reject(errorPromise);
    }
    return Promise.reject(error);
  };

  return client(options).then(onSuccess).catch(onError);
};

export const ApiRequest = <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  options: { params?: object; data?: object } = {},
) => {
  return request<ApiResponse<T> | void>({
    url,
    method,
    ...options,
  });
};
