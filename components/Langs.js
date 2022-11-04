import React from 'react'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { handelLangs } from '../slices/langsSlice';

const Langs = () => {
   // const [lang , setlang] = useState("false")
   const dispatch = useDispatch()
   const lang = useSelector(state => state.langs.value)

   // useEffect(()=>{
   //    setlang(Cookies.get("ar") || "false")
   // },[])

   const setLang = () => {
      // if (lang == "false") {
      //    console.log(false);
      //    // Cookies.set("ar", true)
      // } else {
      //    console.log(true);
      //    Cookies.set("ar", false)
      // }
      dispatch(handelLangs())
   }
   return (
         <button className='bg-primary-100 py-1 px-3 rounded shadow text-sm' onClick={() => setLang()} title={lang ? "Change language to English." : "تغيير اللغة الي العربية"}>
            {!lang ? "العربية" : "English"}
         </button>
   )
}

export default Langs