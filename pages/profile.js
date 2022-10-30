import React from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

export default function Profile() {
   const router = useRouter();
   const [user, setUser] = useState("");
   useEffect(() => {
      if (!Cookies.get("auth")) {
         router.push("/login");
         console.log("not auth");
      } else {
         axios
            .get("https://backends.donnachoice.com/api/users/profile/", {
               headers: {
                  Authorization: `Bearer ${Cookies.get("token")}`,
               },
            })
            .then((res) => {
               setUser(res.data);
               console.log(res.data);
            });
      }
   }, []);
   return (
      <div className="container grid grid-cols-9 gap-8 py-8">
         <nav className="flex col-span-9 bg-gray-50 py-3 px-5 rounded " aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
               <li className="inline-flex items-center">
                  <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                     <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                     Home
                  </a>
               </li>
               <li>
                  <div className="flex items-center">
                     <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                     <span className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2">
                        Profile
                     </span>
                  </div>
               </li>
               <li aria-current="page">
                  <div className="flex items-center">
                     <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                     <span className="ml-1 capitalize text-sm font-medium text-gray-500 md:ml-2">
                        {user.first_name + " " + user.last_name}
                     </span>
                  </div>
               </li>
            </ol>
         </nav>
         <aside className="col-span-2" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded-lg border">
               <ul className="space-y-2">
                  <li>
                     <a
                        href="#"
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-gray-100"
                     >
                        <i className="fad fa-user text-gray-500 text-xl"></i>
                        <span className="ml-3">
                           User
                        </span>
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                     >
                        <i className="fad fa-heart text-gray-500 text-xl"></i>
                        <span className="flex-1 ml-3 whitespace-nowrap">Wish list</span>
                        <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-primary-200 bg-primary/25 rounded-full">
                           3
                        </span>
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                     >
                        {/* <i className="fad fa-shopping-cart"></i> */}
                        <i className="fad fa-shopping-cart text-gray-500 text-xl"></i>
                        <span className="flex-1 ml-3 whitespace-nowrap">Cart</span>
                        <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-primary-200 bg-primary/25 rounded-full">
                           3
                        </span>
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                     >
                        {/* <i className="fad fa-balance-scale"></i> */}
                        <i className="fad fa-balance-scale text-gray-500 text-xl"></i>
                        <span className="flex-1 ml-3 whitespace-nowrap">Compare</span>
                        <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-primary-200 bg-primary/25 rounded-full">
                           3
                        </span>
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                     >
                        <svg
                           aria-hidden="true"
                           className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              fillRule="evenodd"
                              d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                              clipRule="evenodd"
                           />
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">
                           Orders History
                        </span>
                     </a>
                  </li>
               </ul>
               <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200">
                  <li>
                     <button
                        className="flex w-full items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100"
                     >
                        <i className="fad fa-door-open text-gray-500 text-xl"></i>
                        <span className="ml-3">
                           Logout
                        </span>
                     </button>
                  </li>
               </ul>
            </div>
         </aside>
         <div className="col-span-7 space-y-4">
            <div className="head capitalize flex gap-4 items-center text-3xl">
               <i className="fad fa-user-circle text-gray-600 text-5xl"></i>
               {user.first_name + " " + user.last_name}
            </div>
            <div className="info grid grid-cols-8 bg-gray-50 rounded-md border">
               <div className="col-span-2">
                  <div className="py-2 px-4 border-b">First Name</div>
                  <div className="py-2 px-4 border-b">Last Name</div>
                  <div className="py-2 px-4 border-b">Email</div>
                  <div className="py-2 px-4 ">Address</div>
               </div>
               <div className="text-gray-700 col-span-6">
                  <div className="py-2 px-4 capitalize border-l border-b">{user.first_name}</div>
                  <div className="py-2 px-4 capitalize border-l border-b">{user.last_name}</div>
                  <div className="py-2 px-4 border-l border-b">{user.email}</div>
                  <div className="py-2 px-4 border-l">{user.address ? user.address : "no addres yet."}</div>
               </div>
            </div>
         </div>
      </div>
   );
}
