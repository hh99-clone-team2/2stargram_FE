import React, { ChangeEvent, FormEvent, useState } from "react";
import logo from "../../assets/logo.png";
import {
  LoginWrapper,
  LoginFormContainer,
  SignupFormContainer,
  LoginForm,
  LinkForm,
  Input,
  Button,
  Link,
  Img,
  And,
} from "./LoginSignup.module";
import { useMutation } from "@tanstack/react-query";
import { loginUser, signupUser } from "../../axios/api";
import { setCookie, setLocalStorage } from "../../utils/cookieUtils";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleusernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setUsername(username);
  };
  const handleLoginIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const loginId = e.target.value;
    setLoginId(loginId);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
  };

  const newUserInfo = {
    loginId,
    password,
    name,
    username,
  };

  const userInfo = {
    loginId,
    password,
  };

  // 회원가입 통신
  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data: any) => {
      console.log(data);
      if (data.status === 201) {
        alert("회원가입에 성공했습니다.");
        setIsLogin(true);
      }
    },
    onError: (error: any) => {
      console.error("회원가입 실패 : ", error.response);

      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    },
  });
  // 로그인 통신  
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: any) => {
      const refreshToken = data.data.refreshToken;
      const accessToken = data.headers.authorization;
      if (data.status === 200) {
        console.log("로그인 응답 데이터:", data.data);
        setLocalStorage(accessToken);
        setCookie("refreshToken", refreshToken);
        localStorage.setItem("username", data.data.username);
        // setLocalStorage(data.data.username);
        alert(
          `${data.data.username}님 로그인 성공하였습니다. 메인페이지로 이동합니다!`,
        );1
        navigate("/main");
      }
    },
    onError: (error) => {
      console.log("로그인 실패 : ", error); 
      alert("로그인에 실패하였습니다!");
    },
  });

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    if (isLogin) {
      // 로그인 처리
      loginMutation.mutate(userInfo);
    } else {
      // 회원가입 처리
      signupMutation.mutate(newUserInfo);
      console.log("띄울게여 ", newUserInfo);
    }
  };

  return (
    <LoginWrapper>
      <LoginFormContainer show={isLogin}>
        <LoginForm onSubmit={handleFormSubmit}>
          <Img src={logo} alt="로고 이미지" />
          <Input
            type="text"
            name="loginId"
            placeholder="이메일 또는 휴대폰 번호"
            value={loginId}
            onChange={handleLoginIdChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <Button type="submit">로그인</Button>
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
            type="text"
            name="loginId"
            placeholder="이메일 또는 휴대폰 번호"
            value={loginId}
            onChange={handleLoginIdChange}
            required
          />
          <Input
            type="text"
            name="username"
            placeholder="성명"
            value={username}
            onChange={handleusernameChange}
            required
          />
          <Input
            type="text"
            name="name"
            placeholder="사용자 이름"
            value={name}
            onChange={handleNameChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            required
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
