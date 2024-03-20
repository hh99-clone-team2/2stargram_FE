import styled from "styled-components";

const Container = styled.div`
  background-color: #b98686;

  width: 100%;
`;

type PropsType = {
  children: string;
};

function MainComponents({ children }: PropsType) {
  return <Container>{children}</Container>;
}

export default MainComponents;
