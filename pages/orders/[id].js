/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import ReviewForm from '../../components/ReviewForm';

export default function Order() {
   const ar = useSelector(state => state.langs.value)
   const [Reviwe, setReviwe] = useState(false)
   const [Reorder, setReorder] = useState(false)
   useEffect(() => {
      const id = window.location.pathname.split("/")[2]
      console.log(id);
   }, []);
   return (
      <div dir={ar ? "rtl" : "ltr"} className="container pb-8">
         <nav className="flex bg-gray-50 py-3 px-5 rounded mb-8 " aria-label="Breadcrumb">
            <ol className="inline-flex items-center">
               <li className="inline-flex items-center">
                  <Link href="/">
                     <a className="inline-flex gap-2 items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                        {ar ? "الرئيسية" : "Home"}
                     </a>
                  </Link>
               </li>
               <li aria-current="page">
                  <div className="flex items-center gap-2">
                     <i
                        className={`text-gray-400 mx-2 fas ${ar ? "fa-chevron-left" : "fa-chevron-right"
                           }`}
                     ></i>
                     <span className="capitalize text-sm font-medium text-gray-500">
                        {ar ? "تاريخ الطلبات" : "Order History"}
                     </span>
                  </div>
               </li>
               <li aria-current="page">
                  <div className="flex items-center gap-2">
                     <i
                        className={`text-gray-400 mx-2 fas ${ar ? "fa-chevron-left" : "fa-chevron-right"
                           }`}
                     ></i>
                     <span className="capitalize text-sm font-medium text-gray-500">
                        2022-20-02
                     </span>
                  </div>
               </li>
            </ol>
         </nav>

         <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
               <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                     {Reorder && (
                        <th scope="col" className="p-4"></th>
                     )}
                     <th scope="col" className="py-3 px-6">
                        <span className="sr-only">Image</span>
                     </th>
                     <th scope="col" className="py-3 px-6">
                        Product
                     </th>
                     <th scope="col" className="py-3 px-6">
                        <p>Count</p>
                        <p>3</p>
                     </th>
                     <th scope="col" className="py-3 px-6">
                        <p>Total Price</p>
                        <p>500 QR</p>
                     </th>
                     <th scope="col" className="py-3 px-6">
                        <button
                        onClick={() => setReorder(!Reorder)}
                        className='font-medium text-primary-100 border border-primary-100 text-sm py-1 px-2 bg-primary-300 text-center rounded'>Reorder</button>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  <tr className="bg-white border-b">
                     {Reorder && (
                        <th scope="col" className="p-4">
                           <div className="flex items-center">
                              <input defaultChecked id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2" />
                              <label for="checkbox-all" className="sr-only">checkbox</label>
                           </div>
                        </th>
                     )}
                     <td className="p-4 w-32">
                        <img src="https://flowbite.com/docs/images/products/imac.png" alt="Apple Watch" />
                     </td>
                     <td className="py-4 px-6 font-semibold text-gray-900">
                        Apple Watch
                     </td>
                     <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                           1
                        </div>
                     </td>
                     <td className="py-4 px-6 font-semibold text-gray-900">
                        QR 599
                     </td>
                     <td className="py-4 px-6">
                        <button
                        onClick={() => setReviwe(true)}
                        className="font-medium text-white text-sm py-1 px-2 bg-primary-200 text-center rounded">
                           Review
                        </button>
                     </td>
                  </tr>
                  <tr className="bg-white border-b">
                     {Reorder && (
                        <th scope="col" className="p-4">
                           <div className="flex items-center">
                              <input defaultChecked id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2" />
                              <label for="checkbox-all" className="sr-only">checkbox</label>
                           </div>
                        </th>
                     )}
                     <td className="p-4 w-32">
                        <img src="https://flowbite.com/docs/images/products/imac.png" alt="Apple Imac" />
                     </td>
                     <td className="py-4 px-6 font-semibold text-gray-900">
                        Imac 27
                     </td>
                     <td className="py-4 px-6">
                        1
                     </td>
                     <td className="py-4 px-6 font-semibold text-gray-900">
                        QR 2499
                     </td>
                     <td className="py-4 px-6">
                        <a href="#" className="font-medium text-white text-sm py-1 px-2 bg-primary-200 text-center rounded">
                           Reviwe
                        </a>
                     </td>
                  </tr>
                  <tr className="bg-white border-b">
                     {Reorder && (
                        <th scope="col" className="p-4">
                           <div className="flex items-center">
                              <input defaultChecked id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2" />
                              <label for="checkbox-all" className="sr-only">checkbox</label>
                           </div>
                        </th>
                     )}
                     <td className="p-4 w-32">
                        <img src="https://flowbite.com/docs/images/products/imac.png" alt="Iphone 12" />
                     </td>
                     <td className="py-4 px-6 font-semibold text-gray-900">
                        Iphone 12
                     </td>
                     <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                           1
                        </div>
                     </td>
                     <td className="py-4 px-6 font-semibold text-gray-900">
                        QR 999
                     </td>
                     <td className="py-4 px-6">
                        <a href="#" className="font-medium text-white text-sm py-1 px-2 bg-primary-200 text-center rounded">
                           Reviwe
                        </a>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
            {Reorder && (
               <button className='py-3 px-5 w-fit mx-auto my-8 bg-primary-100 rounded-md text-white shadow-md'>Reorder 3 items</button>
            )}
         <div>
            {/* <div className={rev ? "block" : "hidden"}> */}
            {Reviwe && <ReviewForm />}
         </div>
      </div>
   )
}
