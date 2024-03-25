import styled from "styled-components";

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
  display:  "flex";
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const SignupFormContainer = styled.div<{ show: boolean }>`
  display: "flex" ;
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
  position: relative;
`;

const Button = styled.button`
   padding: 10px;
  background: ${props => props.isValid ? '#ff0000' : '#43b4ff'};
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

export {
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
    
}