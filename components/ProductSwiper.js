/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import offer from "../public/images/offer.png";
import Image from "next/image";

// import required modules
import { FreeMode, Thumbs } from "swiper";
import { useEffect } from "react";

export default function ProductSwiper(props) {
   const [thumbsSwiper, setThumbsSwiper] = useState(null);
   useEffect(() => {
      console.log(props.images);
   }, []);
   return (
      <div dir="ltr">
         <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Thumbs]}
            className="mySwiper2"
            loop={true}
         >
            {props.images.length != 0 ? (
               props.images.map((img) => {
                  return (
                     <SwiperSlide key={img.id}>
                        <div className="img-offer">
                           <div className="relative">
                              {props.offer > 0 ? (
                                 <div className="offer">
                                    <Image src={offer} alt="" />
                                    <div className="percing">{props.offer}%</div>
                                 </div>
                              ) : (
                                 ""
                              )}
                              <img src={img.img} className="img-offer" />
                           </div>
                        </div>
                     </SwiperSlide>
                  );
               })
            ) : (
               <SwiperSlide>
                  <div className="img-offer">
                     <div className="relative">
                        {props.offer > 0 ? (
                           <div className="offer">
                              <Image src={offer} alt="" />
                              <div className="percing">{props.offer}%</div>
                           </div>
                        ) : (
                           ""
                        )}
                        <img
                           src="https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
                           alt=""
                        />
                     </div>
                  </div>
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
               {props.images.map((img) => {
                  return (
                     <SwiperSlide key={img.id}>
                        <img src={img.img} />
                     </SwiperSlide>
                  );
               })}
            </Swiper>
         )}
      </div>
   );
}
