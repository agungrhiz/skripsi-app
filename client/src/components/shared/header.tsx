import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Header as Heading } from "antd/es/layout/layout";
import { deleteCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";

const defaultTitle = () => {
  const pathname = usePathname();
  switch (true) {
    case pathname.startsWith("/dashboard/item"):
      return "Item";
    case pathname.startsWith("/dashboard/gallery"):
      return "Gallery";
    case pathname.startsWith("/admin/user"):
      return "User";
    default:
      return "Dashboard";
  }
};

export default function Header({
  collapsed,
  setCollapsed,
  username,
}: {
  collapsed: boolean;
  setCollapsed: Function;
  username?: string;
}) {
  const router = useRouter();

  return (
    <Heading className="p-0 bg-gradient-to-r from-[#CA6632] via-amber-600 to-amber-400">
      <div className="flex">
        <div className="flex-1">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "white",
            }}
          />
          <span className="text-xl font-semibold text-white">{defaultTitle()}</span>
        </div>
        <div className="flex items-center">
          <div className="space-x-1">
            <UserOutlined />
            <span>{username ? username : "-"}</span>
          </div>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={() => {
              deleteCookie("access_token");
              deleteCookie("payload_token");
              router.push("/login");
            }}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </div>
      </div>
    </Heading>
  );
}
