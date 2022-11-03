/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const Footer = () => {
   return (
      <footer className=" bg-gray-100 ">
         <div className=" bg-gray-50">
            <div className="container">
               <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="grid grid-cols-7 gap-4 py-8 items-center">
                     <div className="flex justify-center items-center col-span-2">
                        <i class="fad fa-truck col-span-2 text-6xl"></i>
                     </div>
                     <div className="col-span-5">
                        <h6 className="text-xl font-bold">GREAT VALUE</h6>
                        <p className="font-light text-gray-600 text-sm">Lorem ipsum, dolor sit amet consectetur</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-7 gap-4 py-8 items-center">
                     <div className="flex justify-center items-center col-span-2">
                        <i class="fad fa-credit-card col-span-2 text-6xl"></i>
                     </div>
                     <div className="col-span-5">
                        <h6 className="text-xl font-bold">SAFE PAYMENT</h6>
                        <p className="font-light text-gray-600 text-sm">Lorem ipsum, dolor sit amet consectetur</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-7 gap-4 py-8 items-center">
                     <div className="flex justify-center items-center col-span-2">
                        <i class="fad fa-clock col-span-2 text-6xl"></i>
                     </div>
                     <div className="col-span-5">
                        <h6 className="text-xl font-bold">HELP CENTER</h6>
                        <p className="font-light text-gray-600 text-sm">Lorem ipsum, dolor sit amet consectetur</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="container md:flex md:justify-between p-4 sm:p-6">
            <div className="mb-6 md:mb-0">
               <a href="#" className="flex items-center">
                  <img
                     src="https://i.postimg.cc/nrsTJywx/donna-logo.png"
                     className="mr-5 h-28 drop-shadow"
                     alt="FlowBite Logo"
                  />
               </a>
               <p className="max-w-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
                  tenetur iure amet a. Consequatur, eos optio deleniti atque delectus
                  facilis in ut accusantium nulla! Ullam minima possimus rem ex quae.
               </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
               <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                     Quick Links
                  </h2>
                  <ul className="text-gray-600 space-y-4">
                     <li>
                        <Link href="/">
                           <a className="hover:underline">
                              Home
                           </a>
                        </Link>
                     </li>
                     <li>
                        <Link href={"/categories"}>
                           <a className="hover:underline">
                              Categories
                           </a>
                        </Link>
                     </li>
                     <li>
                        <Link href={"/blog"}>
                           <a className="hover:underline">
                              Blogs
                           </a>
                        </Link>
                     </li>
                     <li>
                        <Link href={"/brands"}>
                           <a className="hover:underline">
                              Brands
                           </a>
                        </Link>
                     </li>
                     <li>
                        <Link href={"/products"}>
                           <a className="hover:underline">
                              Products
                           </a>
                        </Link>
                     </li>
                  </ul>
               </div>
               <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                     Follow us
                  </h2>
                  <ul className="text-gray-600">
                     <li className="mb-4">
                        <a href="#" className="hover:underline ">
                           Facebook
                        </a>
                     </li>
                     <li className="mb-4">
                        <a href="#" className="hover:underline">
                           Instagram
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           Snapchat
                        </a>
                     </li>
                  </ul>
               </div>
               <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                     Legal
                  </h2>
                  <ul className="text-gray-600">
                     <li className="mb-4">
                        <a href="#" className="hover:underline">
                           Privacy Policy
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           Terms &amp; Conditions
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className=" bg-primary-100 text-gray-100 p-4 sm:p-6">
            <div className="container sm:flex sm:items-center sm:justify-between">
               <span className="text-sm sm:text-center capitalize inline-block">
                  developed by{" "}
                  <a
                     href="https://orizon.qa"
                     className="font-bold hover:underline hover:text-black"
                  >
                     Orizon Qatar
                  </a>
               </span>
               <span className="text-sm sm:text-center capitalize inline-block">
                  © 2022 All Copy right reserved to <strong>DONNA CHOICE</strong>
               </span>
               <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                  <a href="#" className="hover:text-gray-900">
                     <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="hover:text-gray-900">
                     <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="hover:text-gray-900">
                     <i className="fab fa-whatsapp"></i>
                  </a>
                  <a href="#" className="hover:text-gray-900">
                     <i className="fab fa-snapchat-ghost"></i>
                  </a>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
