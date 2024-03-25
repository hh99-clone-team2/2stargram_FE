import { ChangeEvent, FormEvent, useState } from "react";
import logo from "../../assets/logo.png";
import {
  LoginWrapper,
  LoginFormContainer,
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
import { ErrorIcon } from "./ErrorIcon ";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
    name: "",
    username: "",
  });
  const [loginIdError, setLoginIdError] = useState(""); // 이메일 또는 휴대폰 번호 유효성 검사 에러 상태 추가
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 유효성 검사 에러 상태 추가

  const navigate = useNavigate();
  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 유효성 검사
    if (name === "loginId") {
      const loginIdRegex =
        /^(?:\d{3}-\d{3,4}-\d{4}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!loginIdRegex.test(value)) {
        setLoginIdError("유효하지 않은 이메일 또는 휴대폰 번호입니다.");
      } else {
        setLoginIdError("");
      }
    } else if (name === "password") {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
      if (!passwordRegex.test(value)) {
        setPasswordError(
          "비밀번호는 숫자, 소문자, 특수문자를 포함하여 8자 이상이어야 합니다.",
        );
      } else {
        setPasswordError("");
      }
    }
  };

  const { loginId, password, name, username } = formData;

  const mutation = useMutation({
    mutationFn: isLogin ? loginUser : signupUser,
    onSuccess: (data: any) => {
      if (isLogin) {
        const refreshToken = data.data.refreshToken;
        const accessToken = data.headers.authorization;
        if (data.status === 200) {
          setLocalStorage(accessToken);
          setCookie("refreshToken", refreshToken);
          localStorage.setItem("username", data.data.username);
          alert(
            `${data.data.username}님 로그인 성공하였습니다. 메인페이지로 이동합니다!`,
          );
          navigate("/");
        }
      } else {
        if (data.status === 201) {
          alert("회원가입에 성공했습니다.");
          setIsLogin(true);
        }
      }
    },
    onError: (error: any) => {
      console.error("에러: ", error); // 에러를 콘솔에 출력합니다.

      // 서버에서 내려준 에러 메시지 확인
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else {
        // 에러 메시지가 없는 경우 기본 메시지 표시
        alert(
          isLogin
            ? "로그인에 실패하였습니다!"
            : "회원가입에 실패했습니다. 다시 시도해주세요.",
        );
      }
    },
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!loginIdError && !passwordError) {
      // 유효성 검사를 통과하는 경우에만 mutation 호출
      mutation.mutate(formData);
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
            onChange={handleInputChange}
            required
          />
          {loginIdError && <ErrorIcon />}
          {!isLogin && (
            <>
              <Input
                type="text"
                name="name"
                placeholder="성명"
                value={name}
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                name="username"
                placeholder="사용자 이름"
                value={username}
                onChange={handleInputChange}
                required
              />
            </>
          )}
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={handleInputChange}
            required
          />
          {passwordError && <ErrorIcon />}
          <Button type="submit">{isLogin ? "로그인" : "가입"}</Button>
          <And>또는</And>
          <Link href="#">비밀번호를 잊으셨나요?</Link>
        </LoginForm>
        <LinkForm>
          <div>
            {isLogin ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}
          </div>
          <div>
            <Link href="#" onClick={handleToggle}>
              {isLogin ? "가입하기" : "로그인하기"}
            </Link>
          </div>
        </LinkForm>
      </LoginFormContainer>
    </LoginWrapper>
  );
};

export default LoginSignup;
