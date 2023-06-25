import React from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import "./style.css";
import { useQueryClient } from "@tanstack/react-query";
const LoginPage: React.FC = () => {
  const queryClient = useQueryClient();
  queryClient.removeQueries()
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
