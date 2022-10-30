import React from "react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import BrandSection from "./BrandSection";

// import React, { useRef, useState } from "react";
// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

const Category = (props) => {
   const [smScreen, setSmScreen] = useState(6);
   useEffect(() => {
      const handleMediaScreen = () => {
         if (window.innerWidth < 767) {
            setSmScreen(2);
         }
      }
      handleMediaScreen()
      window.onresize = () => {
         handleMediaScreen()
      }
      console.log(props.products);
   }, [smScreen]);
   return (
      <>
         {props.products &&
            <div>
               <div className="head flex justify-between items-center">
                  <h4 className="text-xl md:text-2xl font-bold">{props.products.name}</h4>
                  <Link href={props.products.url}>
                     <a
                        className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition hover:shadow-md hover:scale-105">
                        View more
                     </a>
                  </Link>
               </div>
               {/* <Swiper
                  slidesPerView={6}
                  spaceBetween={10}
                  freeMode={true}
                  cssMode={true}
                  navigation={true}
                  pagination={true}
                  mousewheel={true}
                  keyboard={true}
                  modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                  className="mySwiper caregories-slider"
               > */}
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
                  {props.products.products.map(product => {
                     return (
                        <SwiperSlide key={product.id} className="h-full">
                           <Link href={"/products/" + product.slug}>
                              <a className="h-full">
                                 <div className="max-w-sm h-full bg-gray-100 rounded-lg border border-gray-200 shadow-md">
                                    <img
                                       className="rounded-t-lg aspect-square object-cover"
                                       src={product.images.length > 0 ? `https://backends.donnachoice.com${product.images[0].img}` : "https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"} alt="img" />
                                    <div className="p-4">
                                       <h5 className="text-center font-bold text-gray-900">
                                          {product.name}
                                       </h5>
                                    </div>
                                 </div>
                              </a>
                           </Link>
                        </SwiperSlide>
                     )
                  })}
               </Swiper>
            </div>
         }
         {props.brands &&
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
                           <BrandSection slug={brand.slug} name={brand.name} />
                        </SwiperSlide>
                     )
                  })}
               </Swiper>
            </div>
         }
      </>
   )
}

export default Category
