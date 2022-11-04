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
                     <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                        <tbody>
            {products.map(product => {
               return (
                  // <ProductBox key={product.id} product={product} />

                           <tr key={product.id} className="bg-white border-b">
                              <td className="p-4 w-32">
                                 <img src={product.images.length > 0 ? product.images[0].img : "https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"} alt="Apple Watch" />
                              </td>
                              <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                 {ar ? product.name_ar :product.name}
                              </td>
                              <td className="py-4 px-6">
                                 {/* <div className="flex items-center space-x-3">
                                    <button className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                       <span className="sr-only">Quantity button</span>
                                       <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                                    </button>
                                    <div>
                                       <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={1} required />
                                    </div>
                                    <button className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                       <span className="sr-only">Quantity button</span>
                                       <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                    </button>
                                 </div> */}
                                 in stock
                              </td>
                              <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                 $599
                              </td>
                              <td className="py-4 px-6">
                                 <button className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
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