import React from 'react'
import BrandSection from '../../components/BrandSection'
import Hero from '../../components/Hero'
import Axios from 'axios'
import { useEffect } from 'react'

export const getStaticProps = async () => {
   const res = await fetch('http://3.83.152.24/api/brand/');
   let brands = await res.json();
   return {
      props: {
         brands: brands
      }
   }
}

export default function Index({ brands }) {
   useEffect(() => {
      console.log(brands);
   }, [brands]);
   return (
      <div>
         <Hero />
         <div className="container pt-6">
            <div className="relative max-w-lg mx-auto">
               <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
               </div>
               <input type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
               <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 transition hover:shadow-md hover:scale-105">
                  Search
               </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10 py-8">
               {brands.map((brand) => {
                  return (
                     <BrandSection key={brand.id} name={brand.name} slug={brand.slug} />
                  )
               })}
            </div>
         </div>
      </div>
   )
}