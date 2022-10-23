import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

const Category = (props) => {
   return (
      <div>
         <div className="head flex justify-between items-center">
            <h4 className="text-2xl font-bold">{props.title}</h4>
            <a
               href="#"
               className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition hover:shadow-md hover:scale-105">
               View more
            </a>
         </div>
         <Swiper
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
         >
            <SwiperSlide>
               <a href="#">
                  <div className="max-w-sm bg-gray-100 rounded-lg border border-gray-200 shadow-md">
                     <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="img" />
                     <div className="p-4">
                        <h5 className="text-center font-bold text-gray-900">
                           Noteworthy technology
                        </h5>
                     </div>
                  </div>
               </a>
            </SwiperSlide>
            <SwiperSlide>
               <a href="#">
                  <div className="max-w-sm bg-gray-100 rounded-lg border border-gray-200 shadow-md">
                     <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="img" />
                     <div className="p-4">
                        <h5 className="text-center font-bold text-gray-900">
                           Noteworthy technology
                        </h5>
                     </div>
                  </div>
               </a>
            </SwiperSlide>
            <SwiperSlide>
               <a href="#">
                  <div className="max-w-sm bg-gray-100 rounded-lg border border-gray-200 shadow-md">
                     <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="img" />
                     <div className="p-4">
                        <h5 className="text-center font-bold text-gray-900">
                           Noteworthy technology
                        </h5>
                     </div>
                  </div>
               </a>
            </SwiperSlide>
            <SwiperSlide>
               <a href="#">
                  <div className="max-w-sm bg-gray-100 rounded-lg border border-gray-200 shadow-md">
                     <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="img" />
                     <div className="p-4">
                        <h5 className="text-center font-bold text-gray-900">
                           Noteworthy technology
                        </h5>
                     </div>
                  </div>
               </a>
            </SwiperSlide>
            <SwiperSlide>
               <a href="#">
                  <div className="max-w-sm bg-gray-100 rounded-lg border border-gray-200 shadow-md">
                     <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="img" />
                     <div className="p-4">
                        <h5 className="text-center font-bold text-gray-900">
                           Noteworthy technology
                        </h5>
                     </div>
                  </div>
               </a>
            </SwiperSlide>
            <SwiperSlide>
               <a href="#">
                  <div className="max-w-sm bg-gray-100 rounded-lg border border-gray-200 shadow-md">
                     <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="img" />
                     <div className="p-4">
                        <h5 className="text-center font-bold text-gray-900">
                           Noteworthy technology
                        </h5>
                     </div>
                  </div>
               </a>
            </SwiperSlide>
            <SwiperSlide>
               <a href="#">
                  <div className="max-w-sm bg-gray-100 rounded-lg border border-gray-200 shadow-md">
                     <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="img" />
                     <div className="p-4">
                        <h5 className="text-center font-bold text-gray-900">
                           Noteworthy technology
                        </h5>
                     </div>
                  </div>
               </a>
            </SwiperSlide>
            <SwiperSlide>
               <a href="#">
                  <div className="max-w-sm bg-gray-100 rounded-lg border border-gray-200 shadow-md">
                     <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="img" />
                     <div className="p-4">
                        <h5 className="text-center font-bold text-gray-900">
                           Noteworthy technology
                        </h5>
                     </div>
                  </div>
               </a>
            </SwiperSlide>
            <SwiperSlide>
               <a href="#">
                  <div className="max-w-sm bg-gray-100 rounded-lg border border-gray-200 shadow-md">
                     <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="img" />
                     <div className="p-4">
                        <h5 className="text-center font-bold text-gray-900">
                           Noteworthy technology
                        </h5>
                     </div>
                  </div>
               </a>
            </SwiperSlide>
            <SwiperSlide>
               <a href="#">
                  <div className="max-w-sm bg-gray-100 rounded-lg border border-gray-200 shadow-md">
                     <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="img" />
                     <div className="p-4">
                        <h5 className="text-center font-bold text-gray-900">
                           Noteworthy technology
                        </h5>
                     </div>
                  </div>
               </a>
            </SwiperSlide>
            <SwiperSlide>
               <a href="#">
                  <div className="max-w-sm bg-gray-100 rounded-lg border border-gray-200 shadow-md">
                     <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="img" />
                     <div className="p-4">
                        <h5 className="text-center font-bold text-gray-900">
                           Noteworthy technology
                        </h5>
                     </div>
                  </div>
               </a>
            </SwiperSlide>
            {/* <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide> */}
         </Swiper>
      </div>
   )
}

export default Category
