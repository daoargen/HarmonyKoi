import Cookies from "universal-cookie";

import configs from "../configs";

const cookies = new Cookies(null, { path: "/" });

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const setCookie = (name: string, value: string) => {
  cookies.set(name, value);
};

export const removeCookie = (name: string) => {
  cookies.remove(name);
};

export const getToken = () => {
  return getCookie(configs.cookies.accessToken);
};

export const setToken = (token: string) => {
  setCookie(configs.cookies.accessToken, token);
};

export const getRefreshToken = () => {
  return getCookie(configs.cookies.refreshToken);
};

export const setRefreshToken = (token: string) => {
  setCookie(configs.cookies.refreshToken, token);
};

export const removeToken = () => {
  removeCookie(configs.cookies.accessToken);
  removeCookie(configs.cookies.refreshToken);
};