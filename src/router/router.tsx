import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../pages/Main";
import UserPage from "../pages/UserPage";
import LoginSignup from "../components/loginSigup/LoginSignup";

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
        path: `/user/:userId/`,
        element: <UserPage />,
      },
      {
        path: "/login",
        element: <LoginSignup />,
      },
    ],
  },
]);
