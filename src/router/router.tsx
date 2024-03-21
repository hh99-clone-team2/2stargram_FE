import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../pages/Main";
import LoginSignUp from '../pages/LoginSignUp';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "login",
        element: <LoginSignUp />,
      },
    ],
  },
]);
