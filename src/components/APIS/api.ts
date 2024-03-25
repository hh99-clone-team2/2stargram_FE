import axios from "axios";
import { authInstance } from "../../axios/api";
import { getLocalStorage } from "../../utils/cookieUtils";

export const instance = axios.create({
  // API 통신을 위해 axios 인스턴스 생성
  baseURL: "https://tmi-balance.store",
  // 기본이 되는 api 주소
});

authInstance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage();
    if (token) {
      config.headers["authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

// 전체 게시글 조회
export const postWithFollow = async (token: string, cursor: number) => {
  console.log(token);
  try {
    const response = await authInstance.get("/api/p/explore", {
      headers: {
        Authorization: `${token}`,
      },
      params: {
        cursor,
      },
    });
    console.log("------------", response);
    return response;
  } catch (error) {
    console.error("팔로우한 사람의 게시물 조회 중 에러 발생", error);
    throw error;
  }
};

// 인터셉터로 토큰 처리
// Auth 인스턴스 생성 -> 인스턴스 사용하는것들만 토큰 사용

// 댓글 추가 api
// export const addComment = async (postId: number, token:string) => {
//   try {
//     const res = await instance.post(`/api/comments/${postId}/add`)
//   }
// }

// 댓글 조회 api

// 댓글 삭제 api
