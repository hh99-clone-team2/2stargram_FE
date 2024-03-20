import React from "react";
import { useParams } from "react-router-dom";

function UsersComponent() {
  const params = useParams();
  return <div>{params.userId}userPage</div>;
}

export default UsersComponent;
