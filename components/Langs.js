import React from 'react'
// import { Cookies } from 'next/dist/server/web/spec-extension/cookies';
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
// import arimg from "../public/images/saudi-arabia-flag-icon.svg"
// import enimg from "../public/images/united-kingdom-flag-icon.svg"
// import Image from 'next/image';

const Langs = () => {
   // const [lang, setlang] = useState(Cookies.get("ar"));
   const setLang = () => {
      Cookies.set("ar", Cookies.get("ar") == "false" ? true : false)
      location.reload()
   }
   useEffect(() => {
      console.log(Cookies.get("ar"));
   }, [])
   return (
      <a className="flex items-center relative cursor-pointer">
         <button className='lang flex' onClick={() => setLang()}>
            {Cookies.get("ar") ? "العربيه" : "English"}
         </button>
      </a>
   )
}

export default Langs