import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handelLangs } from "../slices/langsSlice";

const Langs = () => {
   const dispatch = useDispatch();
   const lang = useSelector((state) => state.langs.value);

   useEffect(() => {
      const currentLang = localStorage.getItem("lang") == "true" ? true : false;
      dispatch(handelLangs(currentLang));
   }, []);

   const setLang = () => {
      localStorage.setItem("lang", !lang);
      dispatch(handelLangs(!lang));
   };
   return (
      <button
         className="bg-primary-100 py-1 px-3 rounded shadow text-sm"
         onClick={() => setLang()}
         title={
            lang ? "Change language to English." : "تغيير اللغة الي العربية"
         }
      >
         {!lang ? "العربية" : "English"}
      </button>
   );
};

export default Langs;
