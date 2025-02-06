import { client } from "./Request.ts";
import type { InternalAxiosRequestConfig, AxiosError } from "axios";

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
