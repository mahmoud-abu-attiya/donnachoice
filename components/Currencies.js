import React from 'react'
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import arimg from "../public/images/saudi-arabia-flag-icon.svg"
import enimg from "../public/images/united-kingdom-flag-icon.svg"

const Countres = () => {
   const [Currencies, setlang] = useState(Cookies.get("Currencies"));
   const setLang = (param) => {
      Cookies.set("lang", param)
      location.reload();
   }
   useEffect(() => {
      console.log(Cookies.get("lang"));
      let lang = document.querySelector(".lang")
      let langs = document.querySelector(".langs")
      lang.onclick = () => {
         langs.classList.toggle("hidden")
      }
   }, []);
   return (
      <a className="hidden md:flex items-center relative cursor-pointer">
         <button className='lang flex'>
            {Currencies == "en" || !Currencies ? (
               <>
                  {/* <div className="mr-1 h-4 w-4 g-ml-minus-10">
                     <Image src={enimg} alt="hi" />
                  </div> */}
                  QR
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
         <div className="langs hidden absolute top-full min-w-full cursor-pointer z-10">
            <button onClick={() => setLang("en")} className='flex w-full bg-gray-100 items-center justify-center p-2 text-black rounded border shadow-lg hover:bg-gray-300'>
               {/* <div className="mr-1 h-4 w-4 g-ml-minus-10">
                  <Image src={enimg} alt="hi" />
               </div> */}
               QR
            </button>
            <button onClick={() => setLang("ar")} className='flex w-full bg-gray-100 items-center justify-center p-2 text-black rounded border shadow-lg hover:bg-gray-300'>
               {/* <div className="mr-1 h-4 w-4 g-ml-minus-10">
                  <Image src={arimg} alt="hi" />
               </div> */}
               USD
            </button>
         </div>
      </a>
      // <div className="whats flex gap-2 items-center">
      //    <img src="https://d2tsjbw4u8kqa2.cloudfront.net/images/1612601586601e58f26676c0.82320448.jpeg" alt="" className='h-4' />
      //    qa
      // </div>
   )
}

export default Countres