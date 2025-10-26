import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { home5, home11, home14 } from "../assets/images/assets";

const bannerData = [
  {
    title: "Authentic Taste, Natural Goodness",
    subtitle: "Experience the true essence of homemade spices and health mixes, crafted with passion.",
    cta: "Explore Our Products",
    link: "/products"
  },
  {
    title: "Power-Packed Nutrition For Your Family",
    subtitle: "Healthy drinks and mixes that fit your everyday lifestyle. 100% natural and rich in protein.",
    cta: "Discover Health Mixes",
    link: "/products"
  },
  {
    title: "From Our Kitchen to Yours",
    subtitle: "Every pack is carefully crafted without preservatives, ensuring purity and quality in every spoonful.",
    cta: "Shop Now",
    link: "/products"
  }
];

const Banner = () => {
  const bannerImages = [home11, home14, home5];
  const navigate = useNavigate();

  return (
    <div className="w-full relative rounded-2xl overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: '.banner-pagination', bulletClass: 'swiper-bullet', bulletActiveClass: 'swiper-bullet-active' }}
        className="banner-swiper"
      >
        {bannerImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[450px] sm:h-[500px] md:h-[550px] overflow-hidden">
              <img
                src={img}
                alt={bannerData[index].title}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
              
              <div className="absolute inset-0 flex items-center p-6 sm:p-10 md:p-16">
                <div className="max-w-xl text-white">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
                    {bannerData[index].title}
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-200 mb-8">
                    {bannerData[index].subtitle}
                  </p>
                  <button 
                    onClick={() => navigate(bannerData[index].link)}
                    className="px-8 py-3 text-base sm:text-lg font-bold text-white bg-primary rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
                  >
                    {bannerData[index].cta}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="banner-pagination"></div>
      </Swiper>
      
      <style>{`
        .banner-pagination {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          gap: 10px;
        }
        .swiper-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .swiper-bullet-active {
          background: var(--color-accent-dark);
          width: 28px;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Banner;