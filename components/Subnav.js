import Link from 'next/link'
import React from 'react'
// import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAmount } from "../slices/wishlistIndicatorSlice"
import { setCartCount } from "../slices/cartIndicatorSlice"
import { setCompareCount } from "../slices/compareIndicatorSlice"
import axios from 'axios'
import Langs from './Langs'
import Currencies from './Currencies'
import Cookies from 'js-cookie'

const getNumberOfProductsInWishlist = () => {
   const storedWishlist = JSON.parse(localStorage.getItem("stored-wishlist")) || []
   return storedWishlist.length
}

const getNumberOfProductsInCart = () => {
   const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || []
   return storedCart.length
}

const getNumberOfProductsInCompare = () => {
   const storedCompare = JSON.parse(localStorage.getItem("stored-compare")) || []
   return storedCompare.length
}

const Subnav = () => {
   const auth = Cookies.get("auth")
   const wishlistIndicator = useSelector(state => state.wishlistIndicator.count)
   const cartIndicator = useSelector(state => state.cartIndicator.count)
   const compareIndicator = useSelector(state => state.compareIndicator.count)
   const dispatch = useDispatch()
   useEffect(()=>{
      if (!auth) {
         dispatch(setAmount(getNumberOfProductsInWishlist()))
         dispatch(setCartCount(getNumberOfProductsInCart()))
         dispatch(setCompareCount(getNumberOfProductsInCompare()))
      }else{
         axios.get(`https://backends.donnachoice.com/api/counts`,{
            headers: {
               Authorization: `Bearer ${Cookies.get("token")}`,
            },
         })
         .then(res => {
            dispatch(setAmount(res.data.wishlist))
            dispatch(setCartCount(res.data.cart))
         })
         dispatch(setCompareCount(getNumberOfProductsInCompare()))
      }
   }, [])

// export default function Subnav () {
   // const cartCount = useSelector((state) => state.cart.value)
   // const wishCount = useSelector((state) => state.wishList.value)

   const [wishListCount, setwishListCount] = useState();
   const [cartCount, setcartCount] = useState();
   // useEffect(() => {
   //    axios.get("https://backends.donnachoice.com/api/counts").then(res => {
   //       setwishListCount(res.data.wishlist)
   //       setcartCount(res.data.cart)
   //    })
   // }, [wishListCount]);
   return (
      <div className='bg-primary-200 px-2 sm:px-4 py-2.5 text-white'>
         <div className="container flex justify-between items-center flex-wrap">
            <div className="hidden md:flex gap-4">
               <a href="#">
                  <i className="fab fa-facebook-f"></i>
               </a>
               <a href="#">
                  <i className="fab fa-snapchat-ghost"></i>
               </a>
               <a href="#">
                  <i className="fab fa-instagram"></i>
               </a>
               <a href="#">
                  <i className="fas fa-envelope"></i>
               </a>
               <a href="#">
                  <i className="fab fa-whatsapp"></i>
               </a>
            </div>
            <div className="hidden md:block">
               <a href="#"><i className="fas fa-phone-alt"></i> +123 456 7890</a>
            </div>
            {/* <Currencies />
            <Langs /> */}
            <div className="links capitalize">
               <Link href={"/about"}>
                  <a className='border-r px-2 md:px-4 border-gray-900/25'>
                     about us
                  </a>
               </Link>
               <Link href={"/profile"}>
                  <a className='border-r px-2 md:px-4 border-gray-900/25'>
                     Account
                  </a>
               </Link>
               <Link href={"/help"}>
                  <a className='px-4'>
                     Help
                  </a>
               </Link>
            </div>
            <div className="wcs flex gap-4">
               <Link href={"/wish-list"}>
                  <a className="wish_list relative">
                     <i className="fas fa-heart"></i>
                     <span
                        className="top-0 left-full absolute w-5 h-5 bg-red-500 border-2 border-white rounded-full text-sm flex items-center justify-center"
                        style={{ transform: "translate(-50%,-50%)" }}
                     >
                        {wishlistIndicator}
                     </span>
                  </a>
               </Link>
               <Link href={"/cart"}>
                  <a className="cart relative">
                     <i className="fas fa-shopping-cart"></i>
                     <span
                        className="top-0 left-full absolute w-5 h-5 bg-red-500 border-2 border-white rounded-full text-sm flex items-center justify-center"
                        style={{ transform: "translate(-50%,-50%)" }}
                     >
                        {cartIndicator}
                     </span>
                  </a>
               </Link>
               <Link href={"/compare"}>
                  <a className="compare relative">
                     <i className="fas fa-balance-scale"></i>
                     <span
                        className="top-0 left-full absolute w-5 h-5 bg-red-500 border-2 border-white rounded-full text-sm flex items-center justify-center"
                        style={{ transform: "translate(-50%,-50%)" }}
                     >
                        {compareIndicator}
                     </span>
                  </a>
               </Link>
               {/* <Link href={"#"}>
                  <a className="search">
                     <i className="fas fa-search"></i>
                  </a>
               </Link> */}
            </div>
         </div>
      </div>
   )
}
export default Subnav