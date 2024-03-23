import { authInstance } from "./axios";

export const addCreateNewPost = async (postData: any) => {
  try {
    const res = await authInstance.post("/p", postData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res);
    return "회원가입에 성공하셨습니다.";
  } catch (error) {
    return error;
  }
};
