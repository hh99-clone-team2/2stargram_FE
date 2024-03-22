import React, { ChangeEvent, FormEvent, useState } from "react";

import styled from "styled-components";
import logo from "../../assets/logo.png";
import {
  LoginInfo,
  SignupInfo,
  loginUser,
  signupUser,
} from "../../axios/login-api";
import { setCookie, setLocalStorage } from "../../utils/cookieUtils";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { refreshToken, accessToken, username } = data.data;
     
        setLocalStorage(accessToken);
        setCookie("refreshToken", refreshToken);
        localStorage.setItem("username", username);
        alert(`${username}님 로그인 성공하였습니다. 메인페이지로 이동합니다!`);
     
    },
    onError: (error) => {
      console.log("로그인 실패 : ", error);
      alert("로그인에 실패하였습니다!");
    },
  });
  

  

  // 회원가입 통신
  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      if (data.status === 200) {
        alert("회원가입에 성공했습니다. 로그인을 한 뒤 게임을 즐기세요!");
        setIsLogin(true);
      }
    },
    onError: (error) => {
      console.error("회원가입 실패 : ", error);
    },
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) {
        // 로그인 처리
        loginMutation.mutate({ loginId: email, password });
      } else {
        // 회원가입 처리
        signupMutation.mutate({ username, email, password });
      }
    };

  return (
    <LoginWrapper>
      <LoginFormContainer show={isLogin}>
        <LoginForm onSubmit={handleFormSubmit}>
          <Img src={logo} alt="로고 이미지" />
          <Input
            type="email"
            name="email"
            placeholder="이메일 주소"
            value={email}
            onChange={handleEmailChange}
          />
          {isLogin ? (
            <>
              <Input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={password}
                onChange={handlePasswordChange}
              />
              <Button type="submit">로그인</Button>
            </>
          ) : (
            <>
              <Input
                type="text"
                name="username"
                placeholder="사용자 이름"
                value={username}
                onChange={handleUsernameChange}
              />
              <Button type="submit">가입</Button>
            </>
          )}
          <And>또는</And>
          <Link href="#">비밀번호를 잊으셨나요?</Link>
        </LoginForm>
        <LinkForm>
          <div>계정이 없으신가요?</div>
          <div>
            <Link href="#" onClick={handleToggle}>
              {isLogin ? "가입하기" : "로그인하기"}
            </Link>
          </div>
        </LinkForm>
      </LoginFormContainer>

      <SignupFormContainer show={!isLogin}>
        <LoginForm onSubmit={handleFormSubmit}>
          <Img src={logo} alt="로고 이미지" />
          <div>친구들의 사진과 동영상을 보려면 가입하세요</div>
          <Input
            type="email"
            name="email"
            placeholder="이메일 주소"
            value={email}
            onChange={handleEmailChange}
          />
          <Input
            type="text"
            name="username"
            placeholder="사용자 이름"
            value={username}
            onChange={handleUsernameChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button type="submit">가입</Button>
        </LoginForm>
        <LinkForm>
          <div>이미 계정이 있으신가요?</div>
          <div>
            <Link href="#" onClick={handleToggle}>
              로그인하기
            </Link>
          </div>
        </LinkForm>
      </SignupFormContainer>
    </LoginWrapper>
  );
};

export default LoginSignup;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fafafa;
  gap: 10px;
`;

const LoginFormContainer = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const SignupFormContainer = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const LoginForm = styled.form`
  width: 300px;
  background: #fff;
  padding: 60px;
  border: 1px solid #dbdbdb;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LinkForm = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 20px 0px;
  border: 1px solid #dbdbdb;
  width: 420px;
  justify-content: center;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  background: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
  background: #43b4ff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 107%;
`;

const And = styled.div`
  margin: 24px 0px 0px;
`;

const Img = styled.img`
  width: 200px;
  margin-bottom: 50px;
`;

const Link = styled.a`
  margin-top: 40px;
  font-size: 15px;
`;
