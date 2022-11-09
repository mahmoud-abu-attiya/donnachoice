/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Profile() {
   const ar = useSelector((state) => state.langs.value);
   const router = useRouter();
   const [user, setUser] = useState("");
   const wishlistIndicator = useSelector(
      (state) => state.wishlistIndicator.count
   );
   const cartIndicator = useSelector((state) => state.cartIndicator.count);
   const compareIndicator = useSelector((state) => state.compareIndicator.count);
   const handleLogout = () => {
      Cookies.remove("token");
      Cookies.remove("auth");
      router.push("/login");
   };
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
      <div
         dir={ar ? "rtl" : "ltr"}
         className="container grid grid-cols-9 gap-8 py-8"
      >
         <nav
            className="flex col-span-9 bg-gray-50 py-3 px-5 rounded "
            aria-label="Breadcrumb"
         >
            <ol className="inline-flex items-center">
               <li className="inline-flex items-center">
                  <Link href="/">
                     <a className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <svg
                           className={ar ? "w-4 h-4 ml-2" : "w-4 h-4 mr-2"}
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        {ar ? "الرئيسية" : "Home"}
                     </a>
                  </Link>
               </li>
               <li>
                  <div className="flex items-center">
                     {/* <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg> */}
                     <i
                        className={`text-gray-400 mx-2 fas ${ar ? "fa-chevron-left" : "fa-chevron-right"
                           }`}
                     ></i>
                     <span className="text-sm font-medium text-gray-700 hover:text-gray-900">
                        {ar ? "الملف الشخصي" : "Profile"}
                     </span>
                  </div>
               </li>
               <li aria-current="page">
                  <div className="flex items-center">
                     {/* <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg> */}
                     <i
                        className={`text-gray-400 mx-2 fas ${ar ? "fa-chevron-left" : "fa-chevron-right"
                           }`}
                     ></i>

                     <span className="capitalize text-sm font-medium text-gray-500">
                        {user.first_name}
                     </span>
                  </div>
               </li>
            </ol>
         </nav>
         <aside className="col-span-9 lg:col-span-2" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded-lg border">
               <ul className="lg:space-y-2 flex justify-between items-center lg:items-stretch lg:flex-col">
                  <li className="hidden sm:block">
                     <a
                        href="#"
                        className="flex items-center gap-3 p-2 text-base font-normal text-gray-900 rounded-lg bg-gray-100"
                     >
                        <i className="fad fa-user text-gray-500 text-xl hidden sm:block"></i>
                        <span>{ar ? "المستخدم" : "User"}</span>
                     </a>
                  </li>
                  <li>
                     <Link href="/wish-list">
                        <a className="flex items-center gap-2 p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                           <i className="fad fa-heart text-gray-500 text-xl hidden sm:block"></i>
                           <span className="flex-1 whitespace-nowrap">
                              {ar ? "الرغبات" : "Wish list"}
                           </span>
                           <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-primary-100 bg-primary-300 rounded-full">
                              {wishlistIndicator}
                           </span>
                        </a>
                     </Link>
                  </li>
                  <li>
                     <Link href={"/cart"}>
                        <a
                           className="flex items-center gap-2 p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                        >
                           <i className="fad fa-shopping-cart text-gray-500 text-xl hidden sm:block"></i>
                           <span className="flex-1 whitespace-nowrap">
                              {ar ? "العربة" : "Cart"}
                           </span>
                           <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-primary-100 bg-primary-300 rounded-full">
                              {cartIndicator}
                           </span>
                        </a>
                     </Link>
                  </li>
                  <li>
                     <Link href={"/compare"}>
                        <a
                           className="flex items-center gap-2 p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                        >
                           {/* <i className="fad fa-random"></i> */}
                           <i className="fad fa-random text-gray-500 text-xl hidden sm:block"></i>
                           <span className="flex-1 whitespace-nowrap">
                              {ar ? "قارن" : "Compare"}
                           </span>
                           <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-primary-100 bg-primary-300 rounded-full">
                              {compareIndicator}
                           </span>
                        </a>
                     </Link>
                  </li>
               </ul>
               <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200">
                  <li>
                     <button
                        onClick={() => handleLogout()}
                        className="flex w-full gap-2 items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100"
                     >
                        <i className="fad fa-door-open text-gray-500 text-xl"></i>
                        <span>{ar ? "تسجيل الخروج" : "Logout"}</span>
                     </button>
                  </li>
               </ul>
            </div>
         </aside>
         <div className="col-span-9 lg:col-span-7 space-y-4">
            <div className="head capitalize flex gap-4 items-center text-xl md:text-3xl">
               <i className="fad fa-user-circle text-gray-600 text-5xl"></i>
               {user.first_name + " " + user.last_name}
            </div>
            <div className="info grid grid-cols-8 bg-gray-50 rounded-md border max-w-full overflow-x-auto">
               <div className="col-span-3 md:col-span-2">
                  <div className="py-2 px-4 border-b">
                     {ar ? "الاسم الاول" : "First Name"}
                  </div>
                  <div className="py-2 px-4 border-b">
                     {ar ? "الكنية" : "Last Name"}
                  </div>
                  <div className="py-2 px-4 border-b">
                     {ar ? "البريد الإلكتروني" : "Email"}
                  </div>
                  <div className="py-2 px-4 ">
                     {ar ? "العنوان" : "Address"}
                  </div>
               </div>
               <div className="text-gray-700 col-span-5 md:col-span-6">
                  <div
                     className={`py-2 px-4 capitalize ${ar ? "border-r" : "border-l"
                        } border-b`}
                  >
                     {user.first_name}
                  </div>
                  <div
                     className={`py-2 px-4 capitalize ${ar ? "border-r" : "border-l"
                        } border-b`}
                  >
                     {user.last_name}
                  </div>
                  <div
                     className={`py-2 px-4 ${ar ? "border-r" : "border-l"} border-b`}
                  >
                     {user.email}
                  </div>
                  <div className={`py-2 px-4 ${ar ? "border-r" : "border-l"}`}>
                     {user.address ? user.address : "no addres yet."}
                  </div>
               </div>
            </div>
            <div className="space-y-4">
               <h4 className="text-xl font-bold">{ar ? "تاريخ الطلب" : "Order history"}</h4>
               {/* <div className="bg-gray-50 rounded-md border p-8">
                  <p className="text-2xl font-bold text-center">
                     {ar ? "لا توجد طلبات بعد." : "There is no orders yet."}
                  </p>
                  <Link href={"/products"}>
                     <div className="w-full grow max-w-[200px] transition hover:shadow-lg hover:bg-primary-100/75 text-center bg-primary-100 text-white rounded py-3 px-5 mx-auto cursor-pointer my-8">
                        {ar ? "ابدأ التسوق":"Start Shopping"}
                     </div>
                  </Link>
               </div> */}
               <div className="overflow-x-auto relative shadow-md sm:rounded-lg border">
                  <table className="w-full text-sm text-left text-gray-500">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                        <tr>
                           <th scope="col" className="py-3 px-6">
                              Items
                           </th>
                           <th scope="col" className="py-3 px-6">
                              Date
                           </th>
                           <th scope="col" className="py-3 px-6">
                              Total Payment
                           </th>
                           <th scope="col" className="py-3 px-6">
                              Action
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr className="bg-white border-b">
                           <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                              <p>Apple MacBook Pro 17</p>
                              <p>item</p>
                              <p className="font-bold underline">+3</p>
                           </th>
                           <td className="py-4 px-6 whitespace-nowrap">
                              2022-20-02
                           </td>
                           <td className="py-4 px-6">
                              QR 2999
                           </td>
                           <td className="py-4 px-6 flex-col flex gap-2">
                              <Link href={"/orders/1"}>
                                 <a className="font-medium text-white text-sm py-1 px-2 bg-primary-100 text-center rounded">View</a>
                              </Link>
                              <a href="#" className="font-medium text-white text-sm py-1 px-2 bg-primary-100 text-center rounded">Reorder</a>
                              <Link href={"/orders/1"}>
                                 <a className="font-medium text-white text-sm py-1 px-2 bg-primary-100 text-center rounded">Review</a>
                              </Link>
                              {/* <a href="#" className="font-medium text-white text-sm py-1 px-2 bg-primary-100 text-center rounded">Review</a> */}
                           </td>
                        </tr>
                        <tr className="bg-white border-b">
                           <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                              <p>item</p>
                           </th>
                           <td className="py-4 px-6 whitespace-nowrap">
                              2022-20-02
                           </td>
                           <td className="py-4 px-6">
                              QR 299
                           </td>
                           <td className="py-4 px-6 flex-col flex gap-2">
                              <Link href={"/orders/1"}>
                                 <a className="font-medium text-white text-sm py-1 px-2 bg-primary-100 text-center rounded">View</a>
                              </Link>
                              <a href="#" className="font-medium text-white text-sm py-1 px-2 bg-primary-100 text-center rounded">Reorder</a>
                              <Link href={"/orders/1"}>
                                 <a className="font-medium text-white text-sm py-1 px-2 bg-primary-100 text-center rounded">Review</a>
                              </Link>
                           </td>
                        </tr>
                        <tr className="bg-white border-b">
                           <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                              <p>product</p>
                              <p>t-shirt</p>
                              <p className="font-bold underline">+5</p>
                           </th>
                           <td className="py-4 px-6 whitespace-nowrap">
                              2022-20-02
                           </td>
                           <td className="py-4 px-6">
                              QR 299
                           </td>
                           <td className="py-4 px-6 flex-col flex gap-2">
                              <Link href={"/orders/1"}>
                                 <a className="font-medium text-white text-sm py-1 px-2 bg-primary-100 text-center rounded">View</a>
                              </Link>
                              <a href="#" className="font-medium text-white text-sm py-1 px-2 bg-primary-100 text-center rounded">Reorder</a>
                              <Link href={"/orders/1"}>
                                 <a className="font-medium text-white text-sm py-1 px-2 bg-primary-100 text-center rounded">Review</a>
                              </Link>
                           </td>
                        </tr>
                        {/* <tr className="bg-white border-b">
                           <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                              Microsoft Surface Pro
                           </th>
                           <td className="py-4 px-6">
                              White
                           </td>
                           <td className="py-4 px-6">
                              2022-20-02
                           </td>
                           <td className="py-4 px-6">
                              $1999
                           </td>
                           <td className="py-4 px-6">
                              <a href="#" className="font-medium text-blue-600 hover:underline">View</a>
                           </td>
                        </tr>
                        <tr className="bg-white">
                           <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                              Magic Mouse 2
                           </th>
                           <td className="py-4 px-6">
                              Black
                           </td>
                           <td className="py-4 px-6">
                              2022-20-02
                           </td>
                           <td className="py-4 px-6">
                              $99
                           </td>
                           <td className="py-4 px-6">
                              <a href="#" className="font-medium text-blue-600 hover:underline">View</a>
                           </td>
                        </tr> */}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   );
}
