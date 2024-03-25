import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string): void => {
  cookies.set(name, value);
};

export const getCookie = (name: string): string | undefined => {
  return cookies.get(name);
};

export const removeCookie = (name: string): void => {
  cookies.remove(name);
};

export const setLocalStorage = (accessToken: string): void => {
    localStorage.setItem("accessToken", accessToken);
  };
  
  export const getLocalStorage = (): string | null => {
    return localStorage.getItem("accessToken");
  };
  
  export const removeLocalStorage = (): void => {
    localStorage.removeItem("accessToken");
  };
  
  