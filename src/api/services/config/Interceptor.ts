import { client, CustomError, APIError } from './request';
import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

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
  (error: AxiosError<APIError>) => {
    if (error.response?.status === 403) {
      alert('해당 요청에 권한이 없습니다.');
      window.location.href = '/403';
    }

    const serverResponse = error.response?.data;
    let customError;
    if (serverResponse) {
      customError = new Error(error.message, {
        cause: {
          name: serverResponse?.name ?? 'Unknown status',
          message: serverResponse?.message ?? 'Unknown error',
        },
      }) as CustomError;
    } else {
      customError = new Error(error.message || '알 수 없는 오류', {
        cause: {
          name: error.name || 'Generic Error',
          message: error.message || 'An unknown error occurred without server response.',
        },
      }) as CustomError;
    }
    return Promise.reject(customError);
  },
);
