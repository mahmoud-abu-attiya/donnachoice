import Link from 'next/link'
import React from 'react'
// import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Langs from './Langs'

const Subnav = () => {

// export default function Subnav () {
   // const cartCount = useSelector((state) => state.cart.value)
   // const wishCount = useSelector((state) => state.wishList.value)

   const [wishListCount, setwishListCount] = useState();
   const [cartCount, setcartCount] = useState();
   useEffect(() => {
      axios.get("http://3.83.152.24/api/counts").then(res => {
         setwishListCount(res.data.wishlist)
         setcartCount(res.data.cart)
      })
   }, [wishListCount]);
   return (
      <div className='bg-primary px-2 sm:px-4 py-2.5 text-white'>
         <div className="container flex justify-between items-center flex-wrap">
            <div className="flex gap-4">
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
            <div className="phone">
               <a href="#"><i className="fas fa-phone-alt"></i> +123 456 7890</a>
            </div>
            <div className="whats flex gap-2 items-center">
               <img src="https://d2tsjbw4u8kqa2.cloudfront.net/images/1612601586601e58f26676c0.82320448.jpeg" alt="" className='h-4' />
               qa
            </div>
            <Langs />
            <div className="links capitalize">
               <Link href={"#"}>
                  <a className='border-r px-4 border-gray-900/25'>
                     about us
                  </a>
               </Link>
               <Link href={"#"}>
                  <a className='border-r px-4 border-gray-900/25'>
                     Account
                  </a>
               </Link>
               <Link href={"#"}>
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
                        {wishListCount}
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
                        {cartCount}
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