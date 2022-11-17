/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import ReviewForm from "../../components/ReviewForm";
import axios from "axios";
import Cookies from "js-cookie";
import TableP from "../../components/placeholder/TableP";

export default function Order() {
   const ar = useSelector((state) => state.langs.value);
   const [Reviwe, setReviwe] = useState(false);
   const [Reorder, setReorder] = useState(false);
   const [order, setOrder] = useState();
   const [orderReview, setorderReview] = useState();
   const [loading, setloading] = useState(true);

   const reviwe = (item) => {
      setReviwe(true);
      setorderReview(item);
   };

   useEffect(() => {
      const id = window.location.pathname.split("/")[2];
      axios
         .get(`https://backends.donnachoice.com/api/payment/order/${id}`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("token")}`,
            },
         })
         .then((res) => {
            setloading(false);
            console.log(res.data);
            setOrder(res.data);
         });
   }, []);
   if (loading) {
      return <TableP />;
   }
   return (
      <div dir={ar ? "rtl" : "ltr"} className="container py-8">
         <nav
            className="flex bg-gray-50 py-3 px-5 rounded mb-8 "
            aria-label="Breadcrumb"
         >
            <ol className="inline-flex items-center">
               <li className="inline-flex items-center">
                  <Link href="/">
                     <a className="inline-flex gap-2 items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <svg
                           className="w-4 h-4 mr-2"
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
                        {order?.created.slice(0, 10)}
                     </span>
                  </div>
               </li>
            </ol>
         </nav>
         <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table
               className={`w-full text-sm ${ar ? "text-right" : "text-left"
                  } text-gray-500`}
            >
               <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                     {Reorder && <th scope="col" className="p-4"></th>}
                     <th scope="col" className="py-3 px-6">
                        <span className="sr-only">Image</span>
                     </th>
                     <th scope="col" className="py-3 px-6">
                        {ar ? "المنتج" : "Product"}
                     </th>
                     <th scope="col" className="py-3 px-6">
                        <p>{ar ? "العدد" : "Count"}</p>
                     </th>
                     <th scope="col" className="py-3 px-6">
                        <p>{ar ? "السعر" : "Price"}</p>
                     </th>
                     <th scope="col" className="py-3 px-6">

                     </th>
                  </tr>
               </thead>
               <tbody>
                  {order?.items.map((item) => {
                     return (
                        <tr className="bg-white border-b" key={item.id}>
                           {Reorder && (
                              <th scope="col" className="p-4">
                                 <div className="flex items-center">
                                    <input
                                       defaultChecked
                                       type="checkbox"
                                       className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                                    />
                                 </div>
                              </th>
                           )}
                           <td className="p-4 w-32">
                              <img
                                 src={
                                    item.option.product.images != 0
                                       ? item.option.product.images[0].img
                                       : "https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
                                 }
                                 alt="Apple Watch"
                              />
                           </td>
                           <td className="py-4 px-6 font-semibold text-gray-900">
                              {ar ? item.option.name_ar : item.option.name}
                           </td>
                           <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                 {item.quantity}
                              </div>
                           </td>
                           <td className="py-4 px-6 font-semibold text-gray-900">
                              {ar ? "ريال" : "QR"} {item?.price}
                           </td>
                           <td className="py-4 px-6">
                              <button
                                 disabled={item.is_rated}
                                 title={item.is_rated ? "you already rared this product." : ""}
                                 onClick={() => reviwe(item)}
                                 className={`font-medium text-white text-sm py-1 px-2 text-center rounded ${item.is_rated
                                    ? "bg-gray-300 text-200"
                                    : "bg-primary-200"
                                    }`}
                              >
                                 {ar ? "تقييم" : "Review"}
                              </button>
                           </td>
                        </tr>
                     );
                  })}
                  <tr className="text-black text-xl font-bold bg-gray-50">
                     {Reorder && (
                        <th scope="col" className="p-4">
                           <div className="flex items-center gap-2">
                              <input
                                 defaultChecked
                                 id="checkbox-all"
                                 type="checkbox"
                                 className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                              />
                              <label htmlFor="checkbox-all" className="text-sm font-normal">
                                 All
                              </label>
                           </div>
                        </th>
                     )}
                     <td className="p-4">{ar ? "المجموع" : "Total"}:</td>
                     <td className="p-4"></td>
                     <td className="p-4">{order?.count.count}</td>
                     <td className="p-4">{order?.total} {ar ? "ريال" : "QR"}</td>
                     <td className="p-4">
                        <button
                           onClick={() => setReorder(!Reorder)}
                           className="font-medium text-primary-100 border border-primary-100 text-sm py-1 px-2 bg-primary-300 text-center rounded"
                        >
                           {ar ? "اعادة الطلب" : "Reorder"}
                        </button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         {Reorder && (
            <button className="py-3 px-5 w-fit mx-auto my-8 bg-primary-100 rounded-md text-white shadow-md">
               {ar
                  ? `اعادة طلب ${order.items.length} منتجات`
                  : `Reorder ${order.items.length} items`}
            </button>
         )}
         <div>{Reviwe && <ReviewForm item={orderReview} />}</div>
      </div>
   );
}
