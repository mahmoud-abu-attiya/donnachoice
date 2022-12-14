/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
   const ar = useSelector(state => state.langs.value)
   return (
      <footer dir={ar ? "rtl" : "ltr"} className=" bg-gray-100 ">
         <div className=" bg-gray-50">
            <div className="container">
               <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="grid grid-cols-8 gap-4 py-8 items-center">
                     <div className="flex justify-center items-center col-span-2">
                        <i className="fad fa-truck col-span-2 text-4xl"></i>
                     </div>
                     <div className="col-span-6">
                        <h6 className="text-xl font-bold">

                           {ar ? "قيمة عظيمة" : "GREAT VALUE"}
                        </h6>
                        <p className="font-light text-gray-600 text-sm">

                           {ar ? "اعتمد علينا للحصول على أعلى جودة" : "Count on us for the highest Quality"}
                        </p>
                     </div>
                  </div>
                  <div className="grid grid-cols-8 gap-4 py-8 items-center">
                     <div className="flex justify-center items-center col-span-2">
                        <i className="fad fa-credit-card col-span-2 text-4xl"></i>
                     </div>
                     <div className="col-span-6">
                        <h6 className="text-xl font-bold">

                           {ar ? "دفع آمن" : "SAFE PAYMENT"}
                        </h6>
                        <p className="font-light text-gray-600 text-sm">

                           {ar ? "نحن نثق في دونا" : "In Donna, we trust "}
                        </p>
                     </div>
                  </div>
                  <div className="grid grid-cols-8 gap-4 py-8 items-center">
                     <div className="flex justify-center items-center col-span-2">
                        <i className="fad fa-clock col-span-2 text-4xl"></i>
                     </div>
                     <div className="col-span-6">
                        <h6 className="text-xl font-bold">

                           {ar ? "مركز المساعدة" : "HELP CENTER"}
                        </h6>
                        <p className="font-light text-gray-600 text-sm">

                           {ar ? "دائما سعيد للمساعدة" : "Always glad to help"}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="container md:flex gap-8 md:justify-between p-4 sm:p-6">
            <div className="mb-6 md:mb-0">
               <a href="#" className="flex items-center">
                  <img
                     src="https://i.postimg.cc/nrsTJywx/donna-logo.png"
                     className="mr-5 h-28 drop-shadow"
                     alt="FlowBite Logo"
                  />
               </a>
               <p className="max-w-sm">
                  {ar ? `
                  مع دونا ، نقدم الرعاية القصوى والأناقة لجميع احتياجاتك.
                  ` : `
                  With Donna, we provide the ultimate care and style.
                  `}
               </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
               <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">

                     {ar ? "روابط سريعة" : "Quick Links"}
                  </h2>
                  <ul className="text-gray-600 space-y-4">
                     <li>
                        <Link href="/">
                           <a className="hover:underline">
                              {ar ? "الرئيسية" : "Home"}
                           </a>
                        </Link>
                     </li>
                     <li>
                        <Link href={"/categories"}>
                           <a className="hover:underline">
                              {ar ? "الفئات" : "Categories"}
                           </a>
                        </Link>
                     </li>
                     <li>
                        <Link href={"/blog"}>
                           <a className="hover:underline">
                              {ar ? "المدونات" : "Blogs"}
                           </a>
                        </Link>
                     </li>
                     <li>
                        <Link href={"/brands"}>
                           <a className="hover:underline">
                              {ar ? "العلامات التجارية" : "Brands"}
                           </a>
                        </Link>
                     </li>
                     <li>
                        <Link href={"/products"}>
                           <a className="hover:underline">
                              {ar ? "منتجات" : "Products"}
                           </a>
                        </Link>
                     </li>
                  </ul>
               </div>
               <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                     {ar ? "تابعنا" : "Follow us"}
                  </h2>
                  <ul className="text-gray-600">
                     <li className="mb-4">
                        <a href="https://www.facebook.com/donnachoice.qa" className="hover:underline ">
                           {ar ? "فيسبوك" : "Facebook"}
                        </a>
                     </li>
                     <li className="mb-4">
                        <a href="https://www.instagram.com/donnachoice.qa/" className="hover:underline">
                           {ar ? "انستغرام" : "Instagram"}
                        </a>
                     </li>
                     <li className="mb-4">
                        <a href="https://www.snapchat.com/add/donnachoice.qa" className="hover:underline">
                           {ar ? "سناب شات" : "Snapchat"}
                        </a>
                     </li>
                     <li>
                        <a href="https://www.tiktok.com/@donnachoice.qa" className="hover:underline">
                           {ar ? "تيك توك" : "Tiktok"}
                        </a>
                     </li>
                  </ul>
               </div>
               <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase disable">
                     {ar ? "قانوني" : "Legal"}
                  </h2>
                  <ul className="text-gray-600">
                     <li className="mb-4">
                        <a href="#" className="hover:underline disable">
                           {ar ? "سياسة الخصوصية" : "Privacy Policy"}
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline disable">
                           {ar ? "الشورط والاحكام" : "Terms & Conditions"}
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className=" bg-primary-100 text-gray-100 p-4 sm:p-6">
            <div className="container sm:flex sm:items-center sm:justify-between">
               <span className="text-sm sm:text-center capitalize inline-block">
                  {ar ? "تطوير وتنفيذ" : "developed by"}{" "}
                  <a
                     href="https://orizon.qa"
                     className="font-bold hover:underline hover:text-black"
                  >
                     Orizon Qatar
                  </a>
               </span>
               <span className="text-sm sm:text-center capitalize inline-block">
                  {ar ? "© 2022 جميع الحقوق محفوظة" : "© 2022 All Copy right reserved to"} <strong>DONNA CHOICE</strong>
               </span>
               <div className="flex mt-4 gap-6 sm:justify-center sm:mt-0">
                  <a href="https://www.facebook.com/donnachoice.qa" className="hover:text-gray-900">
                     <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.instagram.com/donnachoice.qa/" className="hover:text-gray-900">
                     <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://www.snapchat.com/add/donnachoice.qa" className="hover:text-gray-900">
                     <i className="fab fa-snapchat-ghost"></i>
                  </a>
                  <a href="https://www.tiktok.com/@donnachoice.qa" className="hover:text-gray-900">
                     <i className="fab fa-tiktok"></i>
                  </a>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
