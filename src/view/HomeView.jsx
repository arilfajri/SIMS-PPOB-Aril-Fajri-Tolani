import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Navbar from "../component/Navbar";
import ProfileCard from "../component/ProfileCard";
import {
  bannerSelector,
  servicesSelector,
} from "../config/redux/information/informationSelector";
import { useDispatch } from "react-redux";
import { banner, services } from "../config/redux/information/informationThunk";
import { Link } from "react-router-dom";

const HomeView = () => {
  const dispatch = useDispatch();
  const banners = bannerSelector();
  const allservices = servicesSelector();
  useEffect(() => {
    dispatch(banner());
    dispatch(services());
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-8 md:px-10 lg:px-15 py-8">
        <ProfileCard />
        <div className="py-10">
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-12 md:gap-4 md:grid-cols-4">
            {allservices?.map((service, index) => (
              <div key={index} className="text-center">
                <Link to="/home/payment" state={service}>
                  <img
                    src={service?.service_icon}
                    alt={service?.service_name}
                    className="w-14 h-14 mx-auto mb-2"
                  />
                  <p className="text-xs">{service?.service_name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className=" py-5">
          <h2 className="text-base font-semibold mb-4">
            Temukan promo menarik
          </h2>
          <Swiper
            // slidesPerView={4}
            // spaceBetween={25}
            // pagination={{
            //   clickable: true,
            // }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {banners?.map((banner, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <img
                    src={banner.banner_image}
                    alt={banner.banner_name}
                    className="w-full h-28 object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
