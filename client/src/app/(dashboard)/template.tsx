"use client";

import { Layout } from "antd";
import { useEffect, useState } from "react";
import SideBar from "@/components/shared/sidebar";
import Header from "@/components/shared/header";
import { getCookie } from "cookies-next";
import { Payload } from "@/lib/types/payload";

const { Content } = Layout;

export default function Template({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [session, setSession] = useState<Payload>();

  useEffect(() => {
    const payloadToken = JSON.parse(
      getCookie("payload_token")?.toString() || "{}"
    );
    setSession(payloadToken);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout className="min-h-screen">
      <SideBar collapsed={collapsed} role={session?.role} />
      <Layout>
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          username={session?.username}
        />
        <Content className="m-6">{children}</Content>
      </Layout>
    </Layout>
  );
}
