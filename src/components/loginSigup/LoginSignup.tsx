import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";

// 스타일이 적용된 컴포넌트 정의
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fafafa;
  gap: 10px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  background: #fff;
  padding: 60px;
  border: 1px solid #dbdbdb;
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
  width: 108%; /* 수정된 부분 */
`;

const Img = styled.img`
  width: 200px;
  margin-bottom: 50px;
`;


const LoginSignup = () => {

  const [input, setInput] = useState({ username: "", password: "" });


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  return (
    <LoginWrapper>
      <LoginForm onSubmit={handleSubmit}>
        <Img src={logo} alt="로고 이미지" />
        <Input
          type="text"
          name="username"
          placeholder="전화번호, 사용자 이름 또는 이메일"
          onChange={handleInputChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleInputChange}
        />
        <Button type="submit">로그인</Button>
      </LoginForm>
    </LoginWrapper>
  );
};

export default LoginSignup;
