"use client";

import "swiper/css";
import "swiper/css/free-mode";
import "./list-item-published.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { FlipCard } from "@/components/shared/flip-card";
import { CardItemBack, CardItemFront } from "@/components/shared/card-item";
import { queryItemsPublished } from "@/lib/graphql/items";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useEffect, useState } from "react";
import { Item } from "@/lib/interfaces/item";

const setLoop = (count: number): boolean => {
  if (count > 3) {
    return true;
  }
  return false;
};

const setSlidesPerView = (count: number, max: number): number => {
  if (count > max) {
    return max;
  }
  return count;
};

export const ListItemPublished = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { data } = useQuery(queryItemsPublished);
  const serverUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (data && data.itemsPublished.length > 3) {
      setItems([
        ...data.itemsPublished,
        ...data.itemsPublished,
        ...data.itemsPublished,
      ]);
    } else if (data) {
      setItems(data.itemsPublished);
    }
  }, [data]);

  if (!data) return null;

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      freeMode={true}
      loop={setLoop(items.length)}
      modules={[FreeMode]}
      breakpoints={{
        768: {
          slidesPerView: setSlidesPerView(data.itemsPublished.length, 2),
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: setSlidesPerView(data.itemsPublished.length, 3),
          spaceBetween: 30,
        },
      }}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <FlipCard
            className="max-w-sm w-full"
            front={
              <CardItemFront
                image={serverUrl + "/uploads?url=" + item.upload.url}
                title={item.name}
              />
            }
            back={<CardItemBack content={item.description} />}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
