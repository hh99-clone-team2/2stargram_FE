import axios from "axios";
import { setLocalStorage, getLocalStorage } from "../utils/cookieUtils";

// API 요청을 보낼 기본 인스턴스 생성 env 안넘어오는건가 해서 그냥 url 적은
export const instance = axios.create({
  baseURL: "https://tmi-balance.store",
});

// 인증이 필요한 API 요청을 보낼 인스턴스 생성
export const authInstance = axios.create({
  baseURL: "https://tmi-balance.store",
});
// 토큰을 요청 헤더에 추가하는 인터셉터 설정
authInstance.interceptors.request.use(
  (config) => {
    // 토큰 가져오기
    const token = getLocalStorage();
    // 토큰이 존재하는 경우 요청 헤더에 추가
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 로그인 요청에 대한 처리
export const loginUser = async (loginInfo: any) => {
  try {
    const response = await instance.post("/user/login", loginInfo);
    // 로그인 요청에 성공한 경우 서버로부터 받은 토큰을 로컬 스토리지에 저장
    if (response.status === 200) {
      const token = response.headers.authorization;
      setLocalStorage(token);
    }
    return response;
  } catch (error: any) {
    console.log("로그인 요청 실패:", error.response); // 에러 로그 출력
    throw error;
  }
};

// 회원가입 요청에 대한 처리
export const signupUser = async (signupInfo: any) => {
  try {
    const response = await instance.post("/user/signup", signupInfo);
    // 회원가입 요청에 성공한 경우 서버로부터 받은 토큰을 로컬 스토리지에 저장
    // if (response.status === 201) {
    //   const token = response.headers.authorization;
    //   setLocalStorage(token);
    // }
    return response;
  } catch (error: any) {
    throw error;
  }
};

// 좋아요 요청에 대한 처리
export const likePost = async (postpostId: number) => {
  try {
    // postId를 사용하여 엔드포인트 생성
    const endpoint = `/api/likes/${postpostId}/like`;

    // 좋아요 요청을 보냅니다. 헤더에 토큰을 추가하여 인증합니다.
    const response = await authInstance.post(endpoint);

    return response;
  } catch (error: any) {
    throw error;
  }
};
