import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const client = (() => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      Accept: "application/json, text/plain, */*",
    },
  });
})();

const request = async <T>(options: AxiosRequestConfig): Promise<T> => {
  const onSuccess = (response: AxiosResponse<T>) => {
    const { data } = response;
    return data;
  };

  const onError = function (error: AxiosError) {
    const errorPromise = new Error(error.message, { cause: error.cause });
    return Promise.reject(errorPromise);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
