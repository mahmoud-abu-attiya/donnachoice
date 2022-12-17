import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Hero from "../components/Hero";

export default function About() {
   const ar = useSelector((state) => state.langs.value);
   return (
      <div dir={ar ? "rtl" : "ltr"}>
         <Hero title={ar ? "من نحن" : "about us"} not={true} />
         <div className="container text-center py-10">
            <h1 className="mb-8 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
               {ar
                  ? "من نحن"
                  : "About us"}
            </h1>
            <p className="mb-6 text-lg text-start font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48">
               {ar
                  ? `
                  يتم تعديل منتجاتنا من أجلك فقط. نحن نقدم كل الضروريات التي تحتاجها المرأة لتكون في أفضل شكل وشكل يمكن أن تكون عليه. نسعى جاهدين لجعل النساء يشعرن بالثقة وهدفنا هو منحك الدفعة التي تحتاجها لبدء رحلتك. نحن نقدم السعادة مباشرة إلى عتبة داركم.
               `
                  : `
            Our products are adjusted just for you. We provide all the necessities a woman needs in order to be in the absolute best shape and form she can be. We strive to make women feel confident and our goal is to give you the push you need to start on your journey. We offer happiness right to your doorstep.
            `}
            </p>
            <Link href={"/help"}>
               <a className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-primary-100 rounded-lg hover:bg-primary-200 focus:ring-4">
                  {ar ? "تواصل معنا" : "Get touch with us"}
               </a>
            </Link>
         </div>
      </div>
   );
}
