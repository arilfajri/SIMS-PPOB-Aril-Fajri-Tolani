import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Navbar from "../component/Navbar";
import ProfileCard from "../component/ProfileCard";

const HomeView = () => {
  const [userProfile, setUserProfile] = useState({});
  const [balance, setBalance] = useState("Rp ******");
  const [services, setServices] = useState([]);
  const [banners, setBanners] = useState([]);

  //   useEffect(() => {
  //     // Fetch user profile
  //     fetch("/profile")
  //       .then((res) => res.json())
  //       .then((data) => setUserProfile(data));

  //     // Fetch balance
  //     fetch("/balance")
  //       .then((res) => res.json())
  //       .then((data) => setBalance(`Rp ${data.balance}`));

  //     // Fetch services
  //     fetch("/services")
  //       .then((res) => res.json())
  //       .then((data) => setServices(data));

  //     // Fetch banners
  //     fetch("/banner")
  //       .then((res) => res.json())
  //       .then((data) => setBanners(data));
  //   }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-28 py-8">
        <ProfileCard />
        {/* Services */}
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md shadow hover:shadow-md text-center"
              >
                <img
                  src={service.icon}
                  alt={service.name}
                  className="w-10 h-10 mx-auto mb-2"
                />
                <p className="text-sm font-medium">{service.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Slider */}
        <div>
          <h2 className="text-lg font-medium mb-4">Temukan promo menarik</h2>
          <Swiper
            slidesPerView={2}
            spaceBetween={16}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-base">{banner.title}</h3>
                    <p className="text-sm text-gray-500">
                      {banner.description}
                    </p>
                  </div>
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
