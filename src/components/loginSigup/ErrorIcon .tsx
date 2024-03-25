import styled from "styled-components";

// ErrorIcon 컴포넌트
export const ErrorIcon = () => {
  return <Error>❌</Error>;
};

const Error = styled.div`
  color: #d48181; /* 오류 아이콘 색상 설정 */
  margin-left: 5px; /* 입력란과의 간격 조정 */
  font-size: 20px; /* 아이콘 크기 설정 */
  position: relative;
  right: -138px;
  top: -30px;
  transform: translateY(-50%);
`;
