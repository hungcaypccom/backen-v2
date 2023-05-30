import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { UserProfile } from "interface/user";
import { editUserProfileProxy, getUserProfileProxy } from "proxy";
import React from "react";

const Information: React.FC = () => {
  const { TextArea } = Input;
  const form: any = useForm();
  const queryClient = useQueryClient();

  const getUserProfile = async () => {
    const res: UserProfile = await getUserProfileProxy();
    return res;
  };

  const editUserProfile = async (value: UserProfile) => {
    await editUserProfileProxy(value);
  };

  const dataQuery = useQuery({
    queryKey: ["userprofile"],
    queryFn: getUserProfile,
  });

  const mutation = useMutation({
    mutationFn: editUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userprofile"] });
    },
  });

  const initValue = {
    name: Boolean(dataQuery.data) ? dataQuery.data?.name : "",
    phone: Boolean(dataQuery.data) ? dataQuery.data?.phone_number : "",
    address: Boolean(dataQuery.data) ? dataQuery.data?.adress : "",
    website: Boolean(dataQuery.data) ? dataQuery.data?.website : "",
  };
  return (
    <div className="user-informations">
      <p className="user-category-name">Account information</p>
      <Form
        onFinish={(value) => {
          mutation.mutate(value);
        }}
        initialValues={initValue}
      >
        <Form.Item rules={[{ required: true }]} name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name="phone_number"
          label="Phone"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name="website"
          label="Website"
        >
          <Input />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name="adress" label="Address">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">Save</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Information;
