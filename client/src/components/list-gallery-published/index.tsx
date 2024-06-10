"use client";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./list-gallery-published.css";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Gallery } from "@/lib/interfaces/gallery";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { queryGalleriesPublished } from "@/lib/graphql/galleries";
import { UploadType } from "@/lib/enums/upload-type";

const customStyles = {
  "--swiper-navigation-color": "#fff",
  "--swiper-pagination-color": "#fff",
} as React.CSSProperties;

const setLoop = (count: number): boolean => {
  if (count > 6) {
    return true;
  }
  return false;
};

export const ListGalleryPublished = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [galleries, setGalleries] = useState<Gallery[]>([]);

  const { data } = useQuery(queryGalleriesPublished);
  const serverUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (data) {
      setGalleries(data.galleriesPublished);
    }
  }, [data]);

  if (!data) return null;

  return (
    <div className="h-screen">
      <div className="h-4/5">
        <Swiper
          style={customStyles}
          loop={setLoop(galleries.length)}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {galleries.map((gallery, index) => {
            if (gallery.upload.type === UploadType.IMAGE) {
              return (
                <SwiperSlide key={index}>
                  <div className="h-full w-full">
                    <img
                      src={serverUrl + "/uploads?url=" + gallery.upload.url}
                    />
                    {gallery.title && gallery.description && (
                      <Subtitle
                        title={gallery.title}
                        description={gallery.description}
                      />
                    )}
                  </div>
                </SwiperSlide>
              );
            } else if (gallery.upload.type === UploadType.VIDEO) {
              return (
                <SwiperSlide key={index}>
                  <div className="h-full w-full">
                    <video
                      autoPlay
                      loop
                      muted
                      src={serverUrl + "/uploads?url=" + gallery.upload.url}
                    />
                    {gallery.title && gallery.description && (
                      <Subtitle
                        title={gallery.title}
                        description={gallery.description}
                      />
                    )}
                  </div>
                </SwiperSlide>
              );
            } else {
              return null;
            }
          })}
        </Swiper>
      </div>
      <div className="h-1/5">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={setLoop(galleries.length)}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumbnail"
        >
          {galleries.map((gallery, index) => {
            if (gallery.upload.type === UploadType.IMAGE) {
              return (
                <SwiperSlide key={index}>
                  <img
                    src={
                      serverUrl + "/uploads?url=" + gallery.upload.thumbnailUrl
                    }
                  />
                </SwiperSlide>
              );
            } else if (gallery.upload.type === UploadType.VIDEO) {
              return (
                <SwiperSlide key={index}>
                  <img src="/img/thumbnail.jpg" />
                </SwiperSlide>
              );
            } else {
              return null;
            }
          })}
        </Swiper>
      </div>
    </div>
  );
};

const Subtitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="subtitle">
      <span>
        <h1>{title}</h1>
        <h3>{description}</h3>
      </span>
    </div>
  );
};
