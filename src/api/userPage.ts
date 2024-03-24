import { authInstance } from "./axios";

export const addCreateNewPost = async (postData: any) => {
  try {
    const res = await authInstance.post("/p", postData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getUserPostsList = async (userId: string, cursor: number) => {
  try {
    const res = await authInstance.get(`/p/${userId}?cursor=1`, {
      params: { cursor: cursor },
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
