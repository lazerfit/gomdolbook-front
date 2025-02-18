import { client } from "./Request.ts";
import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

let token: string | null = null;

export const setToken = (newToken: string) => {
  token = newToken;
};

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = token;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status === 204) {
      return { ...res, data: [] };
    }
    return res;
  },
  (error: AxiosError) => Promise.reject(error),
);
