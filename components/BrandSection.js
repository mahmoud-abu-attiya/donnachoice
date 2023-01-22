/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "../public/images/logo-placeholder.png"
import { useSelector } from 'react-redux'
   
const BrandSection = (props) => {
   const ar = useSelector(state => state.langs.value)
   return (
      <Link href={`/products?brand__slug=${props.slug}${props.category_slug ? "&category__slug=" + props.category_slug : ""} `}>
         <a>
            <div className='grid grid-cols-5 items-center bg-gray-100 px-3 sm:px-4 py-4 gap-2 border border-gray-300 shadow rounded transition hover:shadow-md hover:scale-105'>
               <div className="col-span-5 sm:col-span-2">
                  {/* <Image src={logo} alt="brand logo" /> */}
                  <div className="img-container">
                  <img className='rounded aspect-square object-contain  ' src={props.img ? `${props.img}` : "https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"} alt="" />
                  </div>
               </div>
               <div className='col-span-5 sm:col-span-3 text-center sm:text-left'>
                  <p className='capitalize'>{ar ? props.name_ar : props.name}</p>
               </div>
            </div>
         </a>
      </Link>
   )
}

export default BrandSection