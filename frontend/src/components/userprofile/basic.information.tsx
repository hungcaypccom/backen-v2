import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import { FormInstance, useForm } from "antd/es/form/Form";
import { UserProfile } from "interface/user";
import { editUserProfileProxy, getUserProfileProxy } from "services/proxy";
import React, { useEffect } from "react";

const Information: React.FC = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const getUserProfile = async () => {
    const res: UserProfile = await getUserProfileProxy();
    return res;
  };

  const editUserProfile = async (value: UserProfile) => {
    let res = await editUserProfileProxy(value);
    if (res) {
      message.success(res);
    }
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

  useEffect(() => {
    if (dataQuery.data) {
      console.log("setform", dataQuery.data);
      form.setFieldsValue(dataQuery.data);
      console.log("form value", form.getFieldValue("phone_number"));
    }
  }, [form, dataQuery.data]);

  return (
    <div className="user-informations">
      <p className="user-category-name">Account information</p>
      <Form
        onFinish={(value) => {
          mutation.mutate(value);
        }}
        form={form}
      >
        <Form.Item
          rules={[{ required: true }]}
          name="name"
          label="Name"
        >
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
        <Form.Item
          
          rules={[{ required: true }]}
          name="adress"
          label="Address"
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Information;
