/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import BrandSection from "./BrandSection";
import { useSwiper } from 'swiper/react';
import { useSelector } from "react-redux";

// import React, { useRef, useState } from "react";
// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";

export const SwiperButtonNext = ({ children }) => {
   const swiper = useSwiper();
   return <button onClick={() => swiper.slideNext()} className="next">{children}</button>;
};

export const SwiperButtonPrev = ({ children }) => {
   const swiper = useSwiper();
   return <button onClick={() => swiper.slidePrev()} className="prev">{children}</button>;
};

const Category = (props) => {
   const ar = useSelector(state => state.langs.value)
   // useEffect(() => {
   //    console.log(props.product)
   //    console.log(props.products);
   // }, []);
   return (
      <>

         {props.products &&
            <div>
               <div className="head flex justify-between items-center">
                  <h4 className="text-xl md:text-2xl font-bold">{ar ? props.products.name_ar : props.products.name}</h4>
                  <Link href={props.products.url}>
                     <a
                        className="text-white  bg-primary-100  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition hover:shadow-md hover:scale-105">
                        {ar ? "المزيد" : "View more"}
                     </a>
                  </Link>
               </div>
               <Swiper
                  slidesPerView={2}
                  spaceBetween={10}
                  slidesPerGroup={1}
                  loop={true}
                  loopFillGroupWithBlank={true}
                  pagination={{
                     clickable: true,
                  }}
                  breakpoints={{
                     768: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                     },
                     1024: {
                        slidesPerView: 6,
                        spaceBetween: 20,
                     },
                  }}
                  modules={[Pagination]}
                  className="mySwiper caregories-slider"
               >
                  {props.products.items.map((item, index) => {
                     return (
                        <SwiperSlide key={index} className="h-full">
                           <Link href={item.url}>
                              <a className="h-full">
                                 <div className="max-w-sm h-full bg-gray-100 rounded-lg border border-gray-200 shadow-md">
                                    <div className="img-container">
                                    <img
                                       className="square object-contain"
                                       src={item.img ? `https://backends.donnachoice.com${item.img}` : "https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"} alt="img" />
                                    </div>
                                    <div className="py-4">
                                       <h5 className="text-center font-bold text-gray-900">
                                          {ar ? item.name_ar : item.name}
                                       </h5>
                                    </div>
                                 </div>
                              </a>
                           </Link>
                        </SwiperSlide>
                     )
                  })}
                  <div className="flex justify-between w-full absolute bottom-0 z-10">
                  <SwiperButtonPrev>
                     <i className="fas fa-arrow-left"></i>
                  </SwiperButtonPrev>
                  <SwiperButtonNext>
                     <i className="fas fa-arrow-right"></i>
                  </SwiperButtonNext>
                  </div>
               </Swiper>
            </div>
         }
         {/* {props.brands &&
            <div>
               <div className="head flex justify-between items-center">
                  <h4 className="text-xl md:text-2xl font-bold">{props.brands.name}</h4>
                  <Link href={props.brands.url}>
                     <a
                        className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition hover:shadow-md hover:scale-105">
                        View more
                     </a>
                  </Link>
               </div>
               <Swiper
                  slidesPerView={smScreen}
                  spaceBetween={10}
                  slidesPerGroup={1}
                  loop={true}
                  loopFillGroupWithBlank={true}
                  pagination={{
                     clickable: true,
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper caregories-slider"
               >
                  {props.brands.brands.map(brand => {
                     return (
                        <SwiperSlide key={brand.id} className="h-full">
                           <BrandSection slug={brand.slug} name={brand.name} img={brand.img} />
                        </SwiperSlide>
                     )
                  })}
               </Swiper>
            </div>
         } */}
      </>
   )
}

export default Category
