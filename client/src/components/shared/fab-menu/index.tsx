"use client";

import "./fab-menu.css";
import { FloatButton, Tooltip } from "antd";
import {
  BarcodeOutlined,
  HomeOutlined,
  LoginOutlined,
  MenuOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const menus = [
  {
    icon: <HomeOutlined />,
    title: "Home",
    link: "/",
  },
  {
    icon: <PictureOutlined />,
    title: "Gallery",
    link: "/gallery",
  },
  {
    icon: <BarcodeOutlined />,
    title: "Ticket",
    link: "/ticket",
  }, 
  {
    icon: <LoginOutlined />,
    title: "Login",
    link: "/login",
  }
];

export const FabMenu = ({
  startAngle,
  rotationAngle,
  rotation,
  rotationAngleInclusive = true,
}: {
  startAngle: number;
  rotationAngle: number;
  rotation: number;
  rotationAngleInclusive?: boolean;
}) => {
  const router = useRouter();
  return (
    <FloatButton.Group
      icon={<MenuOutlined />}
      trigger="click"
      className="top-0 left-0 m-4"
      type="primary"
    >
      {menus.map((menu, index) => {
        const angle =
          startAngle +
          index *
            (rotationAngle /
              (rotationAngleInclusive ? menus.length - 1 : menus.length));

        return (
          <div
            key={index}
            className="absolute"
            style={{
              transform: `rotate(${angle}deg) translate(${rotation}rem) rotate(-${angle}deg)`,
            }}
          >
            <Tooltip title={menu.title} placement="right">
              <FloatButton
                icon={menu.icon}
                className="bg-black/30"
                onClick={() => router.push(menu.link)}
              />
            </Tooltip>
          </div>
        );
      })}
    </FloatButton.Group>
  );
};
