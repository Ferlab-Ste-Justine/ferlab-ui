/* import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiResponse<T> {
  data: T | undefined;
  response: AxiosResponse;
  error: AxiosError | undefined;
}

const rptApiInstance = axios.create({
  timeout: 15000,
});


export const sendRequestWithRpt = async <T>(config: AxiosRequestConfig) =>
  makeRequest<T>(rptApiInstance, config);

export const makeRequest = async <T>(instance: AxiosInstance, config: AxiosRequestConfig) =>
  instance
    .request<T>(config)
    .then(
      (response): ApiResponse<T> => ({
        response: response,
        data: response.data,
        error: undefined,
      }),
    )
    .catch(
      (err): ApiResponse<T> => ({
        response: err.response,
        data: undefined,
        error: err,
      }),
    ); */