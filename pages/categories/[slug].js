import React from 'react'
import Axios from "axios";
import Hero from "../../components/Hero"
import BrandSection from '../../components/BrandSection';
import { useRouter } from 'next/router';
import Image from 'next/image';
import img from "../../public/images/no-result.png"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Cat = ({ brands }) => {
   const [cat, setCat] = useState()
   const ar = useSelector(state => state.langs.value)
   const router = useRouter()
   const { slug } = router.query
   useEffect(() => {
      axios.get("https://backends.donnachoice.com/api/category/").then(res => {
         const cat = res.data.find(cat => cat.slug === slug)
         setCat(cat)
         console.log(cat);
      })
      console.log(brands);
   }, []);
   return (
      <div dir={ar ? "rtl" : "ltr"}>
         <Hero title={ar ? "العلامات التجارية" : "brands"} />
         <div className="container pt-6">
            <div className='bg-gray-700 text-primary-200 border px-5 py-3 w-fit capitalize text-2xl rounded-md flex items-center gap-4'>
               <span className="text-sm">{ar ? "الفئة" : "category"}:</span>
               {ar ? cat?.name_ar : cat?.name}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10 py-8">
               {brands && brands.length != 0 ?
                  brands.map((brand) => {
                     return (
                        <BrandSection key={brand.id} name={brand.name} img={brand.img} slug={brand.slug} category_slug={slug} />
                     )
                  }) : (
                     <div className='text-2xl capitalize text-center col-span-4'>
                        there no brands in this category
                        <div className="max-w-[500px] mx-auto">
                           <Image src={img} alt="no result" />
                        </div>
                     </div>
                  )
               }
            </div>
         </div>
      </div>
   )
}

export default Cat

export const getStaticProps = async ({ params }) => {
   const { data } = await Axios.get(`https://backends.donnachoice.com/api/brand/?category=${params.slug}`);
   const brands = data;
   return {
      props: {
         brands,
      },
   };
};

export const getStaticPaths = async () => {
   const { data } = await Axios.get("https://backends.donnachoice.com/api/brand/?category");
   const paths = data.map((brands) => ({ params: { slug: brands.slug.toString() } }));
   return {
      paths,
      fallback: true,
   };
};
