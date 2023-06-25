import HomePage from "pages/home";
import UserProfilePage from "pages/user";
import React from "react";
import {
  Route,
  RouterProvider,
  Routes,
  createHashRouter,
} from "react-router-dom";
import { HashRouter } from "react-router-dom/dist";

// no lazy loading for auth pages to avoid flickering

import LoginPage from "../pages/login";
import ComingSoon from "components/exceptions/comingsoon";
import { ResponseInterceptor } from "components/exceptions/respinse.interceptor";
import Error from "components/exceptions/error";

export const AppRouter = () => {
  const router = createHashRouter([
    {
      path: "/",
      element: (
        <ResponseInterceptor>
          <HomePage />
        </ResponseInterceptor>
      ),
    },
    {
      path: "/aisimulation",
      element: (
        <ResponseInterceptor>
          <ComingSoon />
        </ResponseInterceptor>
      ),
    },
    {
      path: "/user",
      element: (
        <ResponseInterceptor>
          <UserProfilePage />
        </ResponseInterceptor>
      ),
    },
    {
      path: "*",
      element: (
          <Error />
      ),
    },
    { path: "/login", element: <LoginPage /> },
  ]);
  return <RouterProvider router={router} />;
};
