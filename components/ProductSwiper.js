/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";


// import required modules
import { FreeMode, Thumbs } from "swiper";
import { useEffect } from "react";

export default function ProductSwiper(props) {
   const [thumbsSwiper, setThumbsSwiper] = useState(null);
   useEffect(() => {
      console.log(props.images);
   }, [])
   return (
      <>
         <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Thumbs]}
            className="mySwiper2"
         >
            {props.images.length != 0 ? props.images.map(img => {
               return (
                  <SwiperSlide key={img.id}>
                     <img src={img.img} />
                  </SwiperSlide>
               )
            }) : (
               <SwiperSlide>
                  <img src="https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg" alt="" />
               </SwiperSlide>
            )}
         </Swiper>
         {props.images.length > 1 && (
            <Swiper
               onSwiper={setThumbsSwiper}
               spaceBetween={10}
               slidesPerView={props.images.length < 4 ? props.images.length : 4}
               freeMode={true}
               watchSlidesProgress={true}
               modules={[FreeMode, Thumbs]}
               className="mySwiper"
            >
               {props.images.map(img => {
                  return (
                     <SwiperSlide key={img.id}>
                        <img src={img.img} />
                     </SwiperSlide>
                  )
               }
               )}
            </Swiper>
         )}
      </>
   );
}
