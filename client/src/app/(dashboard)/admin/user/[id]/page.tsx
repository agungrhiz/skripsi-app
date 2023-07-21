"use client";

import { Button, Divider, Form, Input } from "antd";

enum Role {
  ADMINISTRATOR = "ADMINISTRATOR",
  STAFF = "STAFF",
}

export default function UserFormPage({ params }: { params: { id: string } }) {
  
const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
    return (
    <section className="grid bg-white p-4 rounded-xl shadow space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold leading-3">Form User</h2>
      </div>
      <Divider />
      <Form></Form>
    </section>
  );
}
