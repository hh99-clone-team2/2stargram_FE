import axios from "axios";

export const instance = axios.create({
  baseURL: "https://tmi-balance.store/api",
});

export const authInstance = axios.create({
  baseURL: "https://tmi-balance.store/api",
});

authInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken") || "";
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);