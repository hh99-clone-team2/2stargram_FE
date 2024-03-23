import axios from "axios";

export const instance = axios.create({
  baseURL: "https://tmi-balance.store",
});

export const requestSignUp = async () => {
  try {
    const res = await instance.post("/api/user/signup", {
      loginId: "123ewqre@naver.com",
      password: "TEst123",
      name: "dbswnstn",
      username: "123ewqre",
    });
    console.log(res);
    return "회원가입에 성공하셨습니다.";
  } catch (error) {
    return error;
  }
};

export const loginSignUp = async () => {
  try {
    const res = await instance.post("/api/user/login", {
      loginId: "123ewqre@naver.com",
      password: "TEst123",
    });
    const accessT = res.headers.get("authorization");
    localStorage.setItem("accessToken", accessT);
  } catch (error) {
    throw error;
  }
};

export const authInstance = axios.create({
  baseURL: "https://tmi-balance.store",
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
export const getPosts = async () => {
  try {
    const res = await instance.get("/api/p/explore");
    // console.log(res.headers.authorization.substring(7));
    console.log(res);
    // const accessT = res.headers.get("Content-Type");
    // localStorage.setItem("accessToken", accessT);
  } catch (error) {
    throw error;
  }
};
