import HomePage from "pages/home";
import UserProfilePage from "pages/user";
import React from "react";
import {Route, Routes } from "react-router-dom";
import { HashRouter } from "react-router-dom/dist";

// no lazy loading for auth pages to avoid flickering

import LoginPage from "../pages/login";
import ComingSoon from "components/exceptions/comingsoon";
import { ResponseInterceptor } from "components/exceptions/respinse.interceptor";

export const AppRouter = () => {
  return (
    <HashRouter >
            <ResponseInterceptor />
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="/user" element={<UserProfilePage />} />
          <Route path="/aisimulation" element={<ComingSoon />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </HashRouter>
  );
};
