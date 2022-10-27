import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

export default function App() {
   return (
      <>
         <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
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
