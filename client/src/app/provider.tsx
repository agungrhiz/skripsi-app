"use client";

import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#CA6632",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
