import { IncomingMessage } from "http";
import cookie from "js-cookie";
import Router from "next/router";
// set cookie
export const setCookie = (key: string, value: string) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// remove cookie
export const removeCookie = (key: string) => {
  if (process.browser) {
    cookie.remove(key);
  }
};

// get from cookie
export const getCookie = (key: string, req: IncomingMessage) => {
  if (process.browser) return cookie.get(key);
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

export const getCookieFromBrowser = (key: string) => cookie.get(key);
export const getCookieFromServer = (key: string, req: IncomingMessage) => {
  if (!(req.headers as any)?.cookie) return undefined;
  const token = (req.headers as any).cookie
    .split(";")
    .find((c: string) => c.trim().startsWith(`${key}=`));
  if (!token) return undefined;

  return token.split("=")[1];
};

// set in localstorage
export const setLocalStorage = (key: string, value: any) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove from localstorage
export const removeLocalStorage = (key: string) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// authentuicate user by passing data to cookie and localstorage during signin
export const authenticate = (resp: any, callback: () => void) => {
  setCookie("token", resp?.data.token);
  setLocalStorage("user", resp?.data.user);
  callback();
};

// access user info from localstorage
export const isAuth = (req: IncomingMessage) => {
  if (process.browser) {
    const isCookieExist = getCookie("token", req);
    if (isCookieExist) {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }
      return false;
    }
    return false;
  }
  return false;
};

export const logout = () => {
  removeCookie("token");
  removeLocalStorage("user");
  Router.push("/");
};
