/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useEffect } from 'react';
import ProductBox from '../components/ProductBox';
import Image from 'next/image';
import img from "../public/images/no-result.png";
import Link from 'next/link';
import { useSelector } from 'react-redux';

// export const getStaticProps = async () => {
//    const res = await fetch('https://backends.donnachoice.com/api/products/?slug__in=product,item-2');
//    let products = await res.json();

//    return {
//       props: {
//          products,
//       }
//    }
// }

const WishList = () => {
   const ar = useSelector((state) => state.langs.value);
   const [products, setProducts] = useState([])
   const [loading, setLoading] = useState(true)
   useEffect(() => {
      const auth = Cookies.get("auth")
      if (!auth) {
         const storedWishlist = JSON.parse(localStorage.getItem("stored-wishlist")) || []
         if (storedWishlist.length < 1) {
            storedWishlist.push("---")
         }
         axios.get('https://backends.donnachoice.com/api/products/?slug__in=' + storedWishlist).then(res => {
            setProducts(res.data)
            setLoading(false)
         })
      } else {
         axios.get('https://backends.donnachoice.com/api/products/?is_wishlist=1', {
            headers: {
               Authorization: `Bearer ${Cookies.get("token")}`,
            },
         }).then(res => {
            setProducts(res.data)
            setLoading(false)
         })
      }
   }, []);

   if (loading) {
      return <>
         <div>
            <p>Loading</p>
         </div>
      </>
   }

   return (
      <div dir={ar ? "rtl" : "ltr"} className='container p-5'>
         <nav className="flex bg-gray-50 py-3 px-5 rounded mb-8 " aria-label="Breadcrumb">
            <ol className="inline-flex items-center">
               <li className="inline-flex items-center">
                  <Link href="/">
                     <a className="inline-flex gap-2 items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                        {ar ? "الرئيسية" :"Home"}
                     </a>
                  </Link>
               </li>
               <li aria-current="page">
                  <div className="flex items-center gap-2">
                     {/* <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg> */}
                     <i
                        className={`text-gray-400 mx-2 fas ${ar ? "fa-chevron-left" : "fa-chevron-right"
                           }`}
                     ></i>
                     <span className="capitalize text-sm font-medium text-gray-500">
                        {ar ? "قائمة الرغبات" :"Wishlist"}
                     </span>
                  </div>
               </li>
            </ol>
         </nav>
         {products.length == 0 ? (
            <div className='text-2xl capitalize text-center col-span-4'>
               <div className="max-w-[400px] mx-auto">
                  <Image src={img} alt="no result" />
               </div>
               {ar ? "لا توجد منتجات في قائمة الرغبات الخاصة بك" : "there no products in your wishlist"} <br />
               <Link href={"/products"}>
                  <div className='w-full max-w-[300px] text-center bg-primary-100 text-white rounded-xl shadow hover:bg-primary-200 py-3 px-5 mx-auto cursor-pointer my-8'>
                     {ar ? "اكتشف منتجاتنا" : "Explore our products"}
                  </div>
               </Link>
            </div>
         ) : (
                  <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                     <table className="w-full text-sm text-left text-gray-500">
                        <thead className={`text-xs text-gray-700 uppercase bg-gray-50 ${ar ? "text-right" : "text-left"}`}>
                           <tr>
                              <th scope="col" className="py-3 px-6">
                                 <span className="sr-only">Image</span>
                              </th>
                              <th scope="col" className="py-3 px-6">
                                 {ar ? "المنتج" : "Product"}
                              </th>
                              <th scope="col" className="py-3 px-6">
                                 {ar ? "المخزون" : "Stock"}
                              </th>
                              <th scope="col" className="py-3 px-6">
                                 {ar ? "السعر" : "Price"}
                              </th>
                              <th scope="col" className="py-3 px-6">
                                 {/* {ar ? "" : "Action"} */}
                              </th>
                           </tr>
                        </thead>
                        <tbody className={ar ? "text-right" : "text-left"}>
            {products.map(product => {
               return (
                  // <ProductBox key={product.id} product={product} />

                           <tr key={product.id} className="bg-white border-b">
                              <td className="p-4 w-32">
                                 <img src={product.images.length > 0 ? product.images[0].img : "https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"} alt="Apple Watch" />
                              </td>
                              <td className="py-4 px-6 font-semibold text-gray-900">
                                 {ar ? product.name_ar :product.name}
                              </td>
                              <td className="py-4 px-6">
                                 in stock
                              </td>
                              <td className="py-4 px-6 font-semibold text-gray-900">
                                 {ar ? "ريال" : "QR"} 599
                              </td>
                              <td className="py-4 px-6 flex flex-col gap-2 items-center justify-center">
                                 <button className="font-medium w-full max-w-[6rem] bg-red-600 text-white py-1 px-2 rounded">
                                    {ar ? "ازالة" : "Remove"}
                                 </button>
                                 <button className="font-medium w-full max-w-[6rem] bg-primary-100 text-white py-1 px-2 rounded">
                                    {ar ? "اضف" : "Add"}
                                 </button>
                                 <Link href={`/products/${product.slug}`}>
                                 <a className="font-medium w-full max-w-[6rem] bg-gray-600 text-white py-1 px-2 rounded">
                                    {ar ? "تفاصيل" : "Details"}
                                 </a>
                                 </Link>
                              </td>
                           </tr>
               )
            })}
                        </tbody>
                     </table>
                  </div>
         )}</div>
   )
}

export default WishList