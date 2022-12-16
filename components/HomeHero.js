/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Pagination, Navigation } from "swiper";
import axios from "axios";

export default function App() {
   const [swiperImgs, setSwiperImgs] = useState([]);

   useEffect(() => {
      axios.get("https://backends.donnachoice.com/api/swiper/").then((res) => {
         console.log(res.data);
         setSwiperImgs(res.data);
      });
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
            loop={true}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper homehero"
         >
            {swiperImgs.length > 0 &&
               swiperImgs.map((swiper) => {
                  return (
                     <SwiperSlide
                        key={swiper.id}
                        className="flex justify-center items-center"
                     >
                        {/* <img
                           src={swiper.img_desktop}
                           className="min-h-full min-w-full object-cover"
                           alt=""
                        /> */}
                        <picture className="h-full w-full object-cover">
                           <source
                              media="(min-width: 767px)"
                              srcSet={swiper.img_desktop}
                              className="h-full w-full object-cover"
                           />
                           <source srcSet={swiper.img_mobile} className="h-full w-full object-cover" />
                           <img
                              className="h-full w-full object-cover"
                              src={swiper.img_mobile}
                              alt="vivikola vivi kola qatar"
                           />
                        </picture>
                     </SwiperSlide>
                  );
               })}
         </Swiper>
      </div>
   );
}
