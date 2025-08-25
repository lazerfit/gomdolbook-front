import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse } from '@/api/services/types/commonTypes.js';

export const client = (() => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
  });
})();

export interface APIError {
  name: string;
  message: string;
}

export interface CustomError extends Error {
  cause?: APIError;
}

const request = async <T>(options: AxiosRequestConfig): Promise<T> => {
  const onSuccess = (response: AxiosResponse<T>) => {
    const { data } = response;
    return data;
  };

  const onError = function (error: CustomError | AxiosError | Error) {
    if (error.cause && typeof error.cause === 'object') {
      return Promise.reject(error);
    } else {
      const fallbackError = new Error(error.message || '알 수 없는 오류', {
        cause: {
          name: (error as Error).name || 'Unknown Client Error',
          message: (error as Error).message || 'An unknown error occurred in request function catch block.',
        },
      }) as CustomError;
      return Promise.reject(fallbackError);
    }
  };

  return client(options).then(onSuccess).catch(onError);
};

export const APIRequest = <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  options: { params?: object; data?: object } = {},
) => {
  return request<ApiResponse<T> | void>({
    url,
    method,
    ...options,
  });
};
