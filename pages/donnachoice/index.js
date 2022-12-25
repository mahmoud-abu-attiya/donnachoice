import React from 'react'
import Hero from '../../components/Hero'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import InfluencersBox from '../../components/InfluencersBox'

export default function Index() {
   const [shops, setShops] = useState([]);
   const ar = useSelector((state) => state.langs.value);
   const [query, setQuery] = useState("");
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      axios.get("https://backends.donnachoice.com/api/donna/")
      .then((res) => {
         setShops(res.data)
         // console.log(res.data);
         setLoading(false);
      })
      .catch((err) => {
         console.log(err);
      }
      )
   }, []);
   if (loading) {
      return <div>Loading...</div>;
   }
   return (
      <div>
         <Hero title={ar ? "اختيار دونا" : "Donna Choice"} not={true} />
         <div className="container pt-6">
            <div dir={ar ? "rtl" : "ltr"} className="relative max-w-lg mx-auto">
               <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
               </div>
               <input
                  type="search"
                  id="default-search"
                  className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={ar ? "بحث..." : "Search..."}
                  onChange={(e) => setQuery(e.target.value)}
               />
            </div>
            <div dir={ar ? "rtl" : "ltr"} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10 py-8">
               {shops
                  .filter((item) => {
                     if (ar) {
                        return item.name_ar.toLowerCase().includes(query.toLowerCase())
                     } else {
                        return item.name.toLowerCase().includes(query.toLowerCase())
                     }
                  }
                  ).map((shop) => {
                     return (
                        // <InfluencersBox key={brand.id} name={brand.name} name_ar={brand.name_ar} img={brand.img} slug={brand.slug} />
                        <InfluencersBox key={shop.id} item={shop} cat="shop"/>
                        )
                     })}
            </div>
         </div>
      </div>
   )
}