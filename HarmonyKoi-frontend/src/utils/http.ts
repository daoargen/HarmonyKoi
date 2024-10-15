import axios, { AxiosError, AxiosInstance } from "axios";

import configs from '../configs';
import { AuthResponse } from '../types/auth.type';

import { HTTP_STATUS } from "./constants";
import { getToken, removeToken, setToken } from "./cookies";

class Http {
  private accessToken: string;
  instance: AxiosInstance;

  constructor() {
    this.accessToken = getToken();
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    this.instance.interceptors.response.use(
      (response) => {
        const { url, method } = response.config;
        if (
          method === "post" &&
          (url === configs.routes.login || url === configs.routes.register || url === configs.routes.loginGoogle)
        ) {
          this.accessToken = (response.data as AuthResponse).data.access_token;
          setToken(this.accessToken);
        } else if (url === configs.routes.logout) {
          this.accessToken = "";
          removeToken();
        }
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) removeToken();
        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;

export default http;
