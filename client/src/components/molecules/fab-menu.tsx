"use client";

import { Menu } from "@headlessui/react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { Fragment } from "react";

export function FabMenu({
  children,
  startAngle,
  rotationAngle,
  radius,
  rotationAngleInclusive = true,
  transform = "bottom",
}: {
  children: React.ReactNode;
  startAngle: number;
  rotationAngle: number;
  radius: number;
  rotationAngleInclusive?: boolean;
  transform?: "left" | "right" | "top" | "bottom";
}) {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-white p-1 ${
              open ? "bg-amber-900/70" : "bg-black/20 hover:bg-amber-900/70"
            }`}
          >
            {open ? <XMarkIcon /> : <Bars3Icon />}
          </Menu.Button>
          <Menu.Items>
            {React.Children.map(children, (child, index) => {
              const angle =
                startAngle >= 0
                  ? startAngle +
                    index *
                      (rotationAngle /
                        (rotationAngleInclusive
                          ? React.Children.count(children) - 1
                          : React.Children.count(children)))
                  : Math.abs(startAngle) +
                    (React.Children.count(children) - 1 - index) *
                      (rotationAngle /
                        (rotationAngleInclusive
                          ? React.Children.count(children) - 1
                          : React.Children.count(children)));

              const linear = (transform: "left" | "right" | "top" | "bottom") =>
                ({
                  left: `translateX(${-4 * (index + 1)}rem)`,
                  right: `translateX(${4 * (index + 1)}rem)`,
                  top: `translateY(${-4 * (index + 1)}rem)`,
                  bottom: `translateY(${4 * (index + 1)}rem)`,
                }[transform]);

              return (
                <>
                  <Menu.Item key={index}>
                    <div className="item-menu">{child}</div>
                  </Menu.Item>
                  <style jsx>{`
                    .item-menu {
                      position: absolute;
                      top: 0;
                      transform: ${linear(transform)};
                    }

                    @media (min-width: 768px) {
                      .item-menu {
                        transform: rotate(${angle}deg) translate(${radius}rem)
                          rotate(-${angle}deg);
                      }
                    }
                  `}</style>
                </>
              );
            })}
          </Menu.Items>
        </>
      )}
    </Menu>
  );
}

export function FabItem({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  return (
    <Link
      href={path}
      className="flex h-12 w-12 items-center justify-center rounded-full border-2 hover:border-amber-900/70 p-1 text-white cursor-pointer"
    >
      {children}
    </Link>
  );
}
