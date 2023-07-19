"use client";

import { gql, useMutation } from "@apollo/client";
import { Button, Divider, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormResetPasswordProps {
  title: string;
  token: string;
}

export const FormResetPassword = ({ title, token }: FormResetPasswordProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const [resetPassword, { loading }] = useMutation(
    gql`
      mutation ResetPassword($input: ResetPasswordInput!) {
        resetPassword(resetPasswordInput: $input) {
          email
          passwordHash
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
      await resetPassword({
        variables: {
          input: {
            password: values.password,
            passwordConfirmation: values.passwordConfirmation,
            token: token,
          },
        },
      });
      successMessage("Kata sandi berhasil diubah");
      router.push("/login");
    } catch (error) {
      const message = (error as Error)?.message || "Terjadi kesalahan";
      errorMessage(message);
    }
  };
  return (
    <section className="grid bg-white p-4 rounded-xl shadow space-y-2">
      {contextHolder}
      <div className="text-center break-words max-w-sm md:w-96 w-80">
        <Divider plain>
          <h2 className="font-semibold uppercase leading-3 text-[#683C10]">
            {title}
          </h2>
        </Divider>
        <p>
          Silakan masukkan kata sandi baru untuk akun Anda. Pastikan kata sandi
          yang Anda pilih kuat dan unik.
        </p>
      </div>
      <Form className="max-w-sm md:w-96 w-80" onFinish={onFinish}>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Kata sandi harus diisi" },
            {
              pattern: new RegExp(
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
              ),
              message:
                "Kata sandi harus terdiri dari setidaknya 8 karakter, mengandung satu huruf besar, huruf kecil, angka, dan karakter.",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            type="password"
            placeholder="Kata sandi"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="passwordConfirmation"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Konfirmasi kata sandi harus diisi",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Konfirmasi kata sandi harus sesuai")
                );
              },
            }),
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Konfirmasi kata sandi"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="uppercase"
            loading={false}
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
