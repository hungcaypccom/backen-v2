import { Button, Form, Input } from "antd";
import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { editUserPasswordProxy } from "proxy";
import { PasswordStruct } from "interface/user";

const Password: React.FC = () => {
  const editUserPassword = async (value: PasswordStruct) => {
    await editUserPasswordProxy(value);
  };

  const mutation = useMutation({
    mutationFn: editUserPassword,
  });
  return (
    <div className="user-password">
      <p>Update password</p>
      <Form
        onFinish={(value) => {
          if (value.new_password === value.old_password) {
            mutation.mutate({
              new_password: value.new_password,
              old_password: value.old_password,
            });
          }
        }}
        className="user-password-form"
      >
        <Form.Item
          rules={[{ required: true }]}
          name="old_password"
          label="Old password"
        >
          <Input.Password
            placeholder="Old password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name="new_password"
          label="New password"
        >
          <Input.Password
            placeholder="New password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name="new_password_confirm"
          label="New password"
        >
          <Input.Password
            placeholder="Confirm new password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Save</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Password;
