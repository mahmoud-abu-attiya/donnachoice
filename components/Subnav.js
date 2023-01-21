/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import React from "react";
// import { useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAmount } from "../slices/wishlistIndicatorSlice";
import { setCartCount } from "../slices/cartIndicatorSlice";
import { setCompareCount } from "../slices/compareIndicatorSlice";
import axios from "axios";
import Langs from "./Langs";
import Currencies from "./Currencies";
import Cookies from "js-cookie";





const Subnav = () => {
   const ar = useSelector((state) => state.langs.value);
   const token = Cookies.get("token");
   const auth = Cookies.get("auth");
   const wishlistIndicator = useSelector(
      (state) => state.wishlistIndicator.count
   );
   // const cartIndicator = useSelector((state) => state.cartIndicator.count);
   const cartIndicator = useSelector((state) => state.cartIndicator.count);
   const compareIndicator = useSelector((state) => state.compareIndicator.count);
   const dispatch = useDispatch();
   const opencart = (e) => {
      e.preventDefault();
      const cartitems = localStorage.getItem("stored-cart") || "[]";
      localStorage.setItem("stored-cart", "[]");
      if (auth) {
         window.location.href = `https://backends.donnachoice.com/cart/login_with_token?token=${token}&lang=${ar ? "ar" : "en"}`;
      } else {
         window.location.href = `https://backends.donnachoice.com/cart/save_items_to_session?items=${cartitems}&lang=${ar ? "ar" : "en"}`;
      }
   }
   const getNumberOfProductsInWishlist = () => {
      const storedWishlist = JSON.parse(localStorage.getItem("stored-wishlist") || "[]");
      return storedWishlist.length;
   };
   
   const getNumberOfProductsInCart = () => {
      let storedCart = JSON.parse(localStorage.getItem("stored-cart") || "[]");
      return storedCart.length;
   };
   
   const getNumberOfProductsInCompare = () => {
      let storedCompare = JSON.parse(localStorage.getItem("stored-compare") || "[]");
      return storedCompare.length;
   };
   useEffect(() => {
      const queryParameters = new URLSearchParams(window.location.search);
      const payment = queryParameters.get("status");
      const items = decodeURI(
         queryParameters.get("items") ||
            localStorage.getItem("stored-cart") ||
            "[]"
      ).replaceAll("'", '"');
      const token = queryParameters.get("token") || Cookies.get("token") || "";

      localStorage.setItem("stored-cart", items);
      Cookies.set("token", token);

      if (!auth) {

         dispatch(setAmount(getNumberOfProductsInWishlist()));
         dispatch(setCartCount(getNumberOfProductsInCart()));
         dispatch(setCompareCount(getNumberOfProductsInCompare()));
      } else {
         axios
            .get(`https://backends.donnachoice.com/api/counts`, {
               headers: {
                  Authorization: `Bearer ${Cookies.get("token")}`,
               },
            })
            .then((res) => {
               dispatch(setAmount(res.data.wishlist));
               dispatch(setCartCount(res.data.cart));
            });
         dispatch(setCompareCount(getNumberOfProductsInCompare()));
      }
   }, []);
   return (
      <div className="bg-primary-200 px-0 sm:px-4 py-2.5 text-white">
         <div className="container flex justify-between items-center flex-wrap">
            <div className="hidden md:flex gap-4">
               <a href="https://www.facebook.com/donnachoice.qa">
                  <i className="fab fa-facebook-f"></i>
               </a>
               <a href="https://www.instagram.com/donnachoice.qa/">
                  <i className="fab fa-instagram"></i>
               </a>
               <a href="https://www.snapchat.com/add/donnachoice.qa">
                  <i className="fab fa-snapchat-ghost"></i>
               </a>
               <a href="https://www.tiktok.com/@donnachoice.qa">
                  <i className="fab fa-tiktok"></i>
               </a>
            </div>
            <div className="hidden md:block">
               <a href="tel:+97433189999">
                  <i className="fas fa-phone-alt"></i>+97433189999
               </a>
            </div>
            {/* <Currencies /> */}
            <Langs />
            <div dir={ar ? "rtl" : "ltr"} className="flex capitalize text-sm">
               <Link href={"/about"}>
                  <a className="px-1 md:px-2">
                     {ar ? "من نحن" : "about us"}
                     {/* about us */}
                  </a>
               </Link>
               <Link href={"/profile"}>
                  <a className="border-x px-1 md:px-2 border-primary-100">
                     {ar ? "الحساب" : "Account"}
                     {/* Account */}
                  </a>
               </Link>
               <Link href={"/help"}>
                  <a className="px-1 md:px-2">
                     {ar ? "مساعدة" : "Help"}
                     {/* Help */}
                  </a>
               </Link>
            </div>
            <div className="wcs flex gap-4">
               <Link href={"/wish-list"}>
                  <a className="wish_list relative">
                     <i className="fas fa-heart"></i>
                     <span
                        className="top-0 left-[115%] absolute w-4 h-4 border border-white bg-red-500 rounded-full text-xs flex items-center justify-center"
                        style={{ transform: "translate(-50%,-50%)" }}
                     >
                        {wishlistIndicator}
                     </span>
                  </a>
               </Link>
                  <a onClick={(e) => opencart(e)} href={"/cart"} className="cart relative">
                     <i className="fas fa-shopping-cart"></i>
                     <span
                        className="top-0 left-[115%] absolute w-4 h-4 border border-white bg-red-500 rounded-full text-xs flex items-center justify-center"
                        style={{ transform: "translate(-50%,-50%)" }}
                     >
                        {cartIndicator}
                     </span>
                  </a>
               <Link href={"/compare"}>
                  <a className="compare relative">
                     <i className="fas fa-random"></i>
                     <span
                        className="top-0 left-[115%] absolute w-4 h-4 border border-white bg-red-500 rounded-full text-xs flex items-center justify-center"
                        style={{ transform: "translate(-50%,-50%)" }}
                     >
                        {compareIndicator}
                     </span>
                  </a>
               </Link>
            </div>
         </div>
      </div>
   );
};
export default Subnav;
