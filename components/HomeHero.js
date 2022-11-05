/* eslint-disable @next/next/no-img-element */
import React, { useState,useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay"
import { Autoplay, Pagination, Navigation } from "swiper";
import axios from "axios";


export default function App() {
   const [swiperImgs, setSwiperImgs] = useState([])
   useEffect(() => {
      axios.get("https://backends.donnachoice.com/api/swiper/").then(res => console.log(res.data))
   // console.log(swiperImgs);
   }, []);
   return (
      <div className="homeslider">
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
      </div>
   );
}
