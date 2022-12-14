/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import bg from "../public/images/bg.jpg";

const Hero = (props) => {
   const ar = useSelector((state) => state.langs.value);
   useEffect(() => {
      document.querySelector(".hero").style.backgroundImage = props.bg ? `url(${props.bg})` : `url(${bg})`;
   }, []);
   return (
      <div dir={ar ? "rtl" : "ltr"} className="hero py-16 bg-url relative">
         <div className="overlay z-10"></div>
         <div className="container relative z-20 grid grid-cols-12 items-center">
            <div className={`flex flex-col gap-8 text-white relative ${props.img ? "col-span-8 md:col-span-10 " : "col-span-12"}`}>
               <h2 className="text-2xl md:text-4xl uppercase">
                  {ar
                     ? !props.not
                        ? "قائمة" + " " + props.title
                        : props.title
                     : !props.not
                     ? props.title + " " + "LIST"
                     : props.title}
                  {/* {props.title} */}
               </h2>
               <ol className="inline-flex items-center gap-1 md:gap-2">
                  <li className="inline-flex items-center">
                     <Link href={"/"}>
                        <a className="inline-flex items-center text-sm font-medium">
                           {/* <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> */}
                           <i
                              className={`fas fa-home ${ar ? "ml-2" : "mr-2"}`}
                           ></i>
                           {ar ? "الرئيسية" : "Home"}
                        </a>
                     </Link>
                  </li>
                  <li>
                     <div className="flex items-center">
                        <i
                           className={`fas ${
                              ar ? "fa-chevron-left" : "fa-chevron-right"
                           }`}
                        ></i>
                        <span
                           className={`text-sm font-medium ${
                              ar ? "mr-1 md:mr-2" : "ml-1 md:ml-2"
                           }`}
                        >
                           {props.title}
                        </span>
                     </div>
                  </li>
               </ol>
            </div>
            {props.img && <div className="col-span-4 md:col-span-2">
               <div className="img-container">
                  <img
                     className="object-cover w-full h-full rounded-md"
                     src={props.img}
                     alt="img"
                  />
               </div>
            </div>}
         </div>
      </div>
   );
};

export default Hero;
