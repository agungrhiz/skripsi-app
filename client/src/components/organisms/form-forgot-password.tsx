"use client";

import { gql, useMutation } from "@apollo/client";
import { Button, Divider, Form, Input, message } from "antd";
import Link from "next/link";

export const FormForgotPassword = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [forgotPassword, { loading }] = useMutation(
    gql`
      mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email) {
          email
        }
      }
    `
  );

  const successMessage = (message: string) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const errorMessage = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const onFinish = async (values: any) => {
    try {
      await forgotPassword({
        variables: {
          email: values.email,
        },
      });
      successMessage("Tautan perubahan kata sandi telah dikirim");
    } catch (error) {
      const message = (error as Error)?.message || "Terjadi kesalahan";
      errorMessage(message);
    }
  };

  return (
    <section className="grid bg-white p-6 rounded-xl shadow-2xl space-y-2">
      {contextHolder}
      <div className="text-center break-words max-w-sm md:w-96 w-80">
        <Divider plain>
          <h2 className="font-semibold uppercase leading-3 text-[#683C10]">
            Lupa Kata Sandi
          </h2>
        </Divider>
        <p>
          Masukkan alamat email Anda, Kami akan mengirim tautan perubahan kata
          sandi melalui alamat email Anda
        </p>
      </div>
      <Form className="max-w-sm md:w-96 w-80" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Email harus diisi" },
            {
              type: "email",
              message: "Email tidak valid",
              warningOnly: true,
            },
          ]}
        >
          <Input placeholder="Email" size="large" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="uppercase"
            loading={loading}
            block
          >
            kirim
          </Button>
        </Form.Item>
        <Divider />
      </Form>
      <Link
        className="text-center text-[#CA6632] no-underline hover:text-[#8d4723] hover:underline"
        href="/login"
      >
        Login
      </Link>
    </section>
  );
};
