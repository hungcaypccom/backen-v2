import { Button, Form, Input, message } from "antd";
import { example_account } from "config";
import { LoginInput } from "interface/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginProxy } from "services/proxy/auth";

export const initValues: LoginInput = {
  username: example_account,
  password: "string",
};

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (values: LoginInput) => {
    let res = await loginProxy(values);
    console.log("login success", res);
    if (res === true) {
      message.success("Login successfully")
      navigate("/", { replace: true });
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark="optional"
      initialValues={initValues}
      className="form-login"
    >
      <div className="form-title">Login</div>
      <Form.Item
        name="username"
        label={"Username"}
        rules={[{ required: true, message: `${"Please enter your username"}` }]}
      >
        <Input className="form-login-input" placeholder={`${"email"}`} />
      </Form.Item>
      <Form.Item
        label={"Password"}
        name="password"
        rules={[{ required: true, message: `${"Please enter you password"}` }]}
      >
        <Input
          className="form-login-input"
          type="password"
          placeholder={`${"password"}`}
        />
      </Form.Item>

      <Form.Item noStyle>
        <Button
          className="form-login-submit"
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          {"Login"}
        </Button>
      </Form.Item>
      <Form.Item noStyle>
        <Button
          className="form-login-submit form-login-admin"
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          {"Login as Admin"}
        </Button>
      </Form.Item>
    </Form>
  );
};
