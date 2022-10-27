import React from 'react'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import arimg from "../public/images/saudi-arabia-flag-icon.svg"
import enimg from "../public/images/united-kingdom-flag-icon.svg"
import Image from 'next/image';

const Langs = () => {
   const [lang, setlang] = useState(Cookies.get("lang"));
   const setLang = (param) => {
      Cookies.set("lang", param)
      location.reload();
   }
   useEffect(() => {
      console.log(Cookies.get("lang"));
      let lang = document.querySelector(".lang")
      let langs = document.querySelector(".langs")
      lang.onclick = ()=>{
         langs.classList.toggle("hidden")
      }
   }, []);
   return (
      <a className="flex items-center relative cursor-pointer">
         <button className='lang flex'>
         {lang == "en" || !lang ? (
            <>
               <div className="mr-1 h-4 w-4 g-ml-minus-10">
                  <Image src={enimg} alt="hi" />
               </div>
               English
            </>
         ) : (
            <>
               <div className="mr-1 h-4 w-4 g-ml-minus-10">
                  <Image src={arimg} alt="hi" />
               </div>
               العربيه
            </>
         )}
         </button>
         <div className="langs hidden absolute top-full min-w-full cursor-pointer">
            {lang == "ar" ? (
               <button onClick={() => setLang("en")} className='flex w-full bg-gray-100 items-center justify-center p-2 text-black rounded border shadow-lg hover:bg-gray-300'>
                  <div className="mr-1 h-4 w-4 g-ml-minus-10">
                     <Image src={enimg} alt="hi" />
                  </div>
                  English
               </button>
            ) : (
               <button onClick={() => setLang("ar")} className='flex w-full bg-gray-100 items-center justify-center p-2 text-black rounded border shadow-lg hover:bg-gray-300'>
                  <div className="mr-1 h-4 w-4 g-ml-minus-10">
                     <Image src={arimg} alt="hi" />
                  </div>
                  العربية
               </button>
            )}
         </div>
      </a>
   )
}

export default Langs

//https://d2tsjbw4u8kqa2.cloudfront.net/images/1612601746601e5992d68351.14502961.jpeg
//https://d2tsjbw4u8kqa2.cloudfront.net/images/1612601586601e58f26676c0.82320448.jpeg qa