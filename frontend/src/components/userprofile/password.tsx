import { Button, Form, Input, message } from "antd";
import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { editUserPasswordProxy } from "services/proxy";
import { PasswordStruct } from "interface/user";

const Password: React.FC = () => {
  const editUserPassword = async (value: PasswordStruct) => {
    let res = await editUserPasswordProxy(value);
    if(res) message.success(res)
  };

  const mutation = useMutation({
    mutationFn: editUserPassword,
  });
  return (
    <div className="user-password">
      <p>Update password</p>
      <Form
        onFinish={(value) => {          
          if (value.new_password === value.new_password_confirm && value.new_password !== "") {
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
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
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
          <Button htmlType="submit" type="primary">Save</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Password;
