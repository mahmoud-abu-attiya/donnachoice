import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useEffect } from 'react';
import ProductBox from '../components/ProductBox';

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
      <div className='container p-5 flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
         <nav className="flex col-span-9 bg-gray-50 py-3 px-5 rounded mb-8 " aria-label="Breadcrumb">
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
                        Wishlist
                     </span>
                  </div>
               </li>
            </ol>
         </nav>
         {products.length == 0 ? "there is no products in wishlist yet."
            : (
               products.map(product => {
                  return (
                     <ProductBox key={product.id} product={product} />
                  )
               })
            )}</div>
   )
}

export default WishList