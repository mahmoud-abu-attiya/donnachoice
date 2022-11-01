/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay"
import { Autoplay, Pagination, Navigation } from "swiper";


export default function App() {
   return (
      <>
         <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
               delay: 3500,
               disableOnInteraction: false,
            }}
            pagination={{
               clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper homehero"
         >
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="min-h-full min-w-full object-cover" alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="min-h-full min-w-full object-cover" alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="min-h-full min-w-full object-cover" alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="min-h-full min-w-full object-cover" alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="min-h-full min-w-full object-cover" alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="min-h-full min-w-full object-cover" alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="min-h-full min-w-full object-cover" alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="min-h-full min-w-full object-cover" alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="min-h-full min-w-full object-cover" alt="" />
            </SwiperSlide>
         </Swiper>
      </>
   );
}
