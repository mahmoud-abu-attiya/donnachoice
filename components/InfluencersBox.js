/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const BrandSection = ({item}) => {
   const ar = useSelector((state) => state.langs.value);

   return (
      <Link href={`influencers/${item.slug}`}>
         <a className="h-full">
            <div className="max-w-sm h-full bg-gray-100 rounded-lg border border-gray-200 shadow-md">
               <div className="img-container">
                  <img
                     className="square object-cover"
                     src={
                        item.img
                           ? item?.img
                           : "https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
                     }
                     alt="img"
                  />
               </div>
               <div className="py-4">
                  <h5 className="text-center font-bold text-gray-900">
                     {ar ? item?.name_ar : item?.name}
                  </h5>
               </div>
            </div>
         </a>
      </Link>
   );
};

export default BrandSection;
