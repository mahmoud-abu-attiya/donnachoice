import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

export default function App() {
   return (
      <>
         <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="w-full object-cover" alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="w-full object-cover" alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="w-full object-cover" alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="w-full object-cover" alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="w-full object-cover" alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="w-full object-cover" alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="w-full object-cover" alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="w-full object-cover" alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src="https://donnachoice.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-25-at-3.34.08-PM.jpeg" className="w-full object-cover" alt="" />
            </SwiperSlide>
         </Swiper>
      </>
   );
}
