"use client";

import { Role } from "@/lib/role";
import { TypedDocumentNode, gql, useMutation, useQuery } from "@apollo/client";
import { Button, Divider, Form, Input, Radio, Space, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

const query: TypedDocumentNode<{
  user: User;
}> = gql`
  query User($id: String!) {
    user(id: $id) {
      id
      username
      email
      role
    }
  }
`;

const mutationCreate: TypedDocumentNode<{
  createUser: User;
}> = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
      username
      email
      role
    }
  }
`;

const mutationUpdate: TypedDocumentNode<{
  updateUser: User;
}> = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(updateUserInput: $input) {
      id
      username
      email
      role
    }
  }
`;

type NotificationType = "success" | "error";

export const FormUser = ({ id }: { id?: string }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data } = useQuery(query, {
    variables: {
      id,
    },
    skip: !id,
  });
  const [createUser] = useMutation(mutationCreate);
  const [updateUser] = useMutation(mutationUpdate);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  useEffect(() => {
    if (id && data && data.user) {
      form.setFieldsValue({
        username: data.user.username,
        email: data.user.email,
        role: data.user.role,
      });
    } else {
      form.setFieldsValue({
        role: Role.STAFF,
      });
    }
  }, [id, data, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const userData = {
      username: values.username,
      email: values.email,
      role: values.role,
    };

    try {
      if (id) {
        await updateUser({
          variables: {
            input: {
              id,
              ...userData,
            },
          },
        });
      } else {
        await createUser({
          variables: {
            input: userData,
          },
        });
      }
      setLoading(false);
      sendNotification("success", "Berhasil", "Data berhasil disimpan");
    } catch (error) {
      setLoading(false);
      sendNotification(
        "error",
        "Gagal",
        "Terjadi kesalahan saat menyimpan data"
      );
    }
  };

  const sendNotification = (
    type: NotificationType,
    title: string,
    description: string
  ) => {
    api[type]({
      message: title,
      description,
    });
  };

  return (
    <section className="grid bg-white p-4 rounded-xl shadow space-y-2">
      {contextHolder}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold leading-3">Form User</h2>
      </div>
      <Divider />
      <div className="flex justify-center">
        <Form
          className="max-w-sm md:w-96 w-80 mt-4"
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            label="Nama Pengguna"
            rules={[{ required: true, message: "Nama pengguna harus diisi" }]}
          >
            <Input placeholder="Nama Pengguna" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email harus diisi" },
              { type: "email", message: "Email tidak valid" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Role harus diisi" }]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={Role.STAFF}>{Role.STAFF}</Radio.Button>
              <Radio.Button value={Role.ADMINISTRATOR}>
                {Role.ADMINISTRATOR}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Divider />
          <Form.Item className="text-right">
            <Space>
              <Button
                type="default"
                htmlType="button"
                onClick={() => router.push("/admin/user")}
              >
                Kembali
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Simpan
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};
