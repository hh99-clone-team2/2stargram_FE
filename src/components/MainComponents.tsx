import React from "react";

type PropsType = {
  children: string;
};

function MainComponents({ children }: PropsType) {
  return <div>{children}</div>;
}

export default MainComponents;
