/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import ProductBox from "../components/ProductBox";
import Link from "next/link";
import Image from "next/image";
import img from "../public/images/no-result.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCompareCount } from "../slices/compareIndicatorSlice";
import TableP from "../components/placeholder/TableP";

const getNumberOfProductsInCompare = () => {
   const storedCompare =
      JSON.parse(localStorage.getItem("stored-compare")) || [];
   return storedCompare.length;
};

const handleCompareLocalStorage = (e, itemSlug) => {
   const storedCompare =
      JSON.parse(localStorage.getItem("stored-compare")) || [];
   if (storedCompare.includes(itemSlug)) {
      storedCompare.splice(storedCompare.indexOf(itemSlug), 1);
      e.target.closest(".product-row").style.display = "none";
   }
   localStorage.setItem("stored-compare", JSON.stringify(storedCompare));
};

const Compare = () => {
   const ar = useSelector((state) => state.langs.value);
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const dispatch = useDispatch();
   useEffect(() => {
      const storedCompare =
         JSON.parse(localStorage.getItem("stored-compare")) || [];
      if (storedCompare.length < 1) {
         storedCompare.push("---");
      }
      console.log(storedCompare);
      axios
         .get(
            "https://backends.donnachoice.com/api/products/?slug__in=" +
               storedCompare
         )
         .then((res) => {
            setProducts(res.data);
            console.log(res.data);
            setLoading(false);
         });
   }, []);

   const removeFromCompare = (e, item) => {
      handleCompareLocalStorage(e, item);
      dispatch(setCompareCount(getNumberOfProductsInCompare()));
   };

   if (loading) {
      return <TableP />;
   }

   return (
      <div
         dir={ar ? "rtl" : "ltr"}
         className="container p-5 flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
         <nav
            className="flex bg-gray-50 py-3 px-5 rounded mb-8 w-full col-span-9"
            aria-label="Breadcrumb"
         >
            <ol className="inline-flex items-center w-full">
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
                        className={`text-gray-400 mx-2 fas ${
                           ar ? "fa-chevron-left" : "fa-chevron-right"
                        }`}
                     ></i>
                     <span className="capitalize text-sm font-medium text-gray-500">
                        {ar ? "المقارنة" : "Compare"}
                     </span>
                  </div>
               </li>
            </ol>
         </nav>
         {products.length == 0 ? (
            <div className="text-xl sm:text-2xl capitalize text-center col-span-4">
               <div className="max-w-[300px] mx-auto">
                  <Image src={img} alt="no result" />
               </div>
               {ar
                  ? "لا توجد منتجات في قائمة المقارنة."
                  : "There no products in compare list."}{" "}
               <br />
               <Link href={"/products"}>
                  <div className="w-full max-w-[500px] text-center bg-primary-100 text-white rounded py-3 px-5 mx-auto cursor-pointer my-8">
                     {ar
                        ? "استكشف المنتجات وأضفها للمقارنة"
                        : "Explor products and add to compare"}
                  </div>
               </Link>
            </div>
         ) : (
            <div className="col-span-9 overflow-x-auto relative shadow-md sm:rounded-lg max-w-full">
               <table className="w-full text-sm text-left text-gray-500">
                  <thead
                     className={`text-xs text-gray-700 uppercase bg-gray-50 ${
                        ar ? "text-right" : "text-left"
                     }`}
                  >
                     <tr className="border-b">
                        <th scope="col" className="p-4">
                           #
                        </th>
                        <th scope="col" className="py-3 px-6">
                           {ar ? "منتج" : "Product"}
                        </th>
                        <th scope="col" className="py-3 px-6">
                           {ar ? "الفئة" : "Category"}
                        </th>
                        <th scope="col" className="py-3 px-6">
                           {ar ? "المخزون" : "Stock"}
                        </th>

                        <th scope="col" className="py-3 px-6 whitespace-nowrap">
                           {ar ? "السعر" : "Price"}
                        </th>
                        <th scope="col" className="py-3 px-6"></th>
                     </tr>
                  </thead>
                  <tbody className={ar ? "text-right" : "text-left"}>
                     {products.map((product, index) => {
                        return (
                           <tr
                              key={product.id}
                              className="bg-white border-b product-row"
                           >
                              <td className="p-4 w-4">{index + 1}</td>
                              <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                 <img
                                    className="h-12"
                                    src={
                                       product.images.length == 0
                                          ? "https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
                                          : product.images[0].img
                                    }
                                    alt={product.name}
                                 />
                                 <Link href={`/products/${product.slug}`}>
                                    <a className="hover:underline">
                                       {ar ? product.name_ar : product.name}
                                    </a>
                                 </Link>
                              </th>
                              <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                 {ar
                                    ? product.category.name_ar
                                    : product.category.name}
                              </th>
                              <th className="py-4 px-6">
                                 <p className="text-primary-100 bg-primary-300 rounded-full py-1 px-4 w-fit whitespace-nowrap">
                                    {product.available
                                       ? ar
                                          ? "متاح"
                                          : "in stock"
                                       : ar
                                       ? "غبر متاح"
                                       : "out stock"}
                                 </p>
                              </th>

                              <td className="py-4 px-6 product-total-price">
                                 <p className="whitespace-nowrap">
                                    {product.options[0].price} {ar ? "ريال" : "QR"}
                                 </p>
                              </td>
                              <td className="py-4 px-6 flex flex-col gap-2 items-center justify-center">
                                 <button
                                    onClick={(e) =>
                                       removeFromCompare(e, product.slug)
                                    }
                                    className="font-medium w-full max-w-[6rem] bg-red-600 text-white py-1 px-2 rounded"
                                 >
                                    {ar ? "ازالة" : "Remove"}
                                 </button>
                                 <Link href={`/products/${product.slug}`}>
                                    <a className="text-center font-medium w-full max-w-[6rem] bg-gray-600 text-white py-1 px-2 rounded">
                                       {ar ? "تفاصيل" : "Details"}
                                    </a>
                                 </Link>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   );
};

export default Compare;
