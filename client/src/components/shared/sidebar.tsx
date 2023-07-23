import { Role } from "@/lib/role";
import {
  AppstoreAddOutlined,
  PictureOutlined,
  PieChartOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  key: React.Key,
  label: React.ReactNode,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    label,
    icon,
    children,
  } as MenuItem;
}

const defaultSelectedKeys = () => {
  const pathname = usePathname();
  switch (true) {
    case pathname === "/dashboard":
      return ["dashboard"];
    case pathname.startsWith("/dashboard/item"):
      return ["item"];
    case pathname.startsWith("/dashboard/gallery"):
      return ["gallery"];
    case pathname.startsWith("/admin/user"):
      return ["user"];
    default:
      return ["dashboard"];
  }
};

export default function SideBar({
  collapsed,
  role,
}: {
  collapsed: boolean;
  role?: Role;
}) {
  const items: MenuItem[] = [
    getItem(
      "dashboard",
      <Link href="/dashboard">Dashboard</Link>,
      <PieChartOutlined />
    ),
    getItem(
      "item",
      <Link href="/dashboard/item">Item</Link>,
      <AppstoreAddOutlined />
    ),
    getItem(
      "gallery",
      <Link href="/dashboard/gallery">Gallery</Link>,
      <PictureOutlined />
    ),

    role === Role.ADMINISTRATOR
      ? getItem("administrator", "Administrator", <SettingOutlined />, [
          getItem(
            "user",
            <Link href="/admin/user">User</Link>,
            <UserOutlined />
          ),
        ])
      : null,
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
      <div className="bg-[#CA6632] h-16 grid place-items-center shadow-xl">
        <Image src="/img/kawung.png" width={30} height={30} alt="logo" />
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={defaultSelectedKeys()}
        defaultOpenKeys={["administrator"]}
        items={items}
      />
    </Sider>
  );
}
