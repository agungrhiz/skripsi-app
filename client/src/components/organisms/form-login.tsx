"use client";

import { gql, useMutation } from "@apollo/client";
import { Alert, Button, Checkbox, Divider, Form, Input } from "antd";
import { setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const FormLogin = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    const remember = localStorage.getItem("remember");
    if (remember) {
      const { email, password } = JSON.parse(remember);
      setRememberMe(true);
      form.setFieldsValue({ email, password, remember });
    }
  }, []);

  const [login, { loading, error }] = useMutation(
    gql`
      mutation Login($input: CredentialsAuthInput!) {
        login(credentials: $input) {
          accessToken
          payload {
            sub
            username
            email
            role
            iat
            exp
          }
        }
      }
    `
  );

  const onFinish = async (values: any) => {
    try {
      const { email, password, remember } = values;
      if (remember) {
        localStorage.setItem("remember", JSON.stringify({ email, password }));
      } else {
        localStorage.removeItem("remember");
      }

      const { data } = await login({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      setCookie("access_token", data.login.accessToken);
      setCookie("payload_token", data.login.payload);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="grid bg-white p-6 rounded-xl shadow-2xl space-y-2">
      <div className="text-center">
        <Image src="/img/kawung2.png" width={64} height={64} alt="logo" />
        <Divider plain>
          <h2 className="font-semibold uppercase leading-3 text-[#683C10]">
            login
          </h2>
        </Divider>
      </div>
      {error && <Alert message={error.message} type="error" showIcon />}
      <Form className="max-w-sm md:w-96 w-80" form={form} onFinish={onFinish}>
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
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Kata sandi harus diisi" }]}
        >
          <Input.Password
            type="password"
            placeholder="Kata sandi"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            >
              Ingat saya
            </Checkbox>
          </Form.Item>
          <Link
            className="float-right text-[#CA6632] hover:text-[#8d4723] hover:underline"
            href="/forgot-password"
          >
            Lupa kata sandi?
          </Link>
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
            masuk
          </Button>
        </Form.Item>
        <Divider />
      </Form>
      <Link
        className="text-center text-[#CA6632] no-underline hover:text-[#8d4723] hover:underline"
        href="/"
      >
        Beranda
      </Link>
    </section>
  );
};
