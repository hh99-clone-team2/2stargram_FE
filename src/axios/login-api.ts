import { AxiosResponse } from "axios";
import { instance } from "../axios/api";

export interface LoginInfo {
  loginId: string;
  password: string;
}

export interface SignupInfo {
  username: string;
  email: string;
  password: string;
}

export const loginUser = async (loginInfo: LoginInfo): Promise<AxiosResponse<any, any>> => {
    try {
      const response: AxiosResponse<any, any> = await instance.post("/user/login", loginInfo);
      return response;
    } catch (error: any) {
      console.error(error.response);
      throw error;
    }
  };
  

export const signupUser = async (signupInfo: SignupInfo): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await instance.post("/user/signup", signupInfo);
    return response;
  } catch (error: any) {
    console.error(error.response);
    throw error;
  }
};
