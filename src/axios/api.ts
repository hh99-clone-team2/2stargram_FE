import axios from "axios";
import { getLocalStorage } from "../utils/cookieUtils";

// Axios를 사용하여 서버와 통신하는 인스턴스를 생성
// 토큰이 필요한 경우와 필요하지 않은 경우를 각각 다르게 처리

// 토큰이 필요 없는 경우
export const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
});

// 토큰이 필요한 경우
export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
});

// getLocalStorage() 함수를 사용하여 로컬 스토리지에서 토큰을 가져와서 헤더에 추가
// 따라서 모든 요청에 대해 토큰을 수동으로 추가하는 대신에 인터셉터를 사용하여 자동으로 처리
authInstance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);