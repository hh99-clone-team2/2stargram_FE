import { authInstance } from "./axios";

export const addCreateNewPost = async (postData: any) => {
  try {
    const res = await authInstance.post("/p", postData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
};
