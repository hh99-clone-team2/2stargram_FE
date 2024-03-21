import React from "react";
import UsersComponent from "../components/users/UsersComponent";
import styled from "styled-components";

function UserPage() {
  return (
    <>
      <UserContainer>
        <UsersComponent />
      </UserContainer>
    </>
  );
}
const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 45px;
`;

export default UserPage;
