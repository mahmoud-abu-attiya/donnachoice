import React from 'react'
import BrandSection from '../../components/BrandSection'
import Hero from '../../components/Hero'
import Axios from 'axios'
import { useEffect, useState } from 'react'

export const getStaticProps = async () => {
   const res = await fetch('https://backends.donnachoice.com/api/brand/');
   let brands = await res.json();
   return {
      props: {
         brands: brands
      }
   }
}

export default function Index({ brands }) {
   const [query, setQuery] = useState("");
   useEffect(() => {
      console.log(brands);
   }, [brands]);
   return (
      <div>
         <Hero title="brands" />
         <div className="container pt-6">
            <div className="relative max-w-lg mx-auto">
               <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
               </div>
               <input
                  type="search"
                  id="default-search"
                  className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
                  onChange={(e) => setQuery(e.target.value)}
               />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10 py-8">
               {brands
                  .filter((item) =>
                     item.name.toLowerCase().includes(query.toLowerCase())
                  ).map((brand) => {
                     return (
                        <BrandSection key={brand.id} name={brand.name} img={brand.img} slug={brand.slug} />
                     )
                  })}
            </div>
         </div>
      </div>
   )
}