import { url_modules } from "../url_modules";
import axios, { AxiosInstance } from "axios";
import { errorInterceptor, responseInterceptor } from "./apiService.helper";

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({ baseURL, timeout: 20000 });

  instance.interceptors.response.use(responseInterceptor, errorInterceptor);

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("user");
    if (token && config.headers) {
      config.headers.Authorization = token;
    }
    return config;
  }, Promise.reject);

  return instance;
};

export const clients = {
  BASE: createAxiosInstance(url_modules.API_BASE_URL) as AxiosInstance,
};
