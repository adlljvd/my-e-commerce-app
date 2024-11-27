"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Banner() {
  const banners = [
    { image: "/assets/1.png" },
    { image: "/assets/2.png" },
    { image: "/assets/3.png" },
    { image: "/assets/4.png" },
    { image: "/assets/5.png" },
  ];

  return (
    <div className="banner-section relative mt-10 mb-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="custom-swiper rounded-lg overflow-hidden shadow-lg"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              src={banner.image}
              alt={`Banner ${index + 1}`}
              className="w-full object-cover h-60 md:h-80"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
