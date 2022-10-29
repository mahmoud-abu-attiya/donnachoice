import React from 'react'
import Axios from "axios";
import { useEffect } from 'react';
import axios from 'axios';

const Brand = ({ brand }) => {
   useEffect(() => {
      const categorySlug = window.location.search.split("=")[1];
      const brandSlug = window.location.pathname.slice(8)
      console.log(categorySlug);
      console.log(brandSlug);

      axios.get(`https://backends.donnachoice.com/api/products/?brand__slug=${brandSlug}&category__slug=${categorySlug}`)
      .then(res => console.log(res.data))
   }, [])
   return (
      <>
         <div>{brand && brand.name}</div>
         <div>{brand && brand.slug}</div>
      </>
   )
}

export default Brand

// export const getStaticProps = async ({ params }) => {
//    const { data } = await Axios.get(`https://backends.donnachoice.com/api/brand/${params.slug}`);
//    const brand = data;
//    return {
//       props: {
//          brand,
//       },
//    };
// };

// export const getStaticPaths = async () => {
//    const { data } = await Axios.get("https://backends.donnachoice.com/api/brand/");
//    const paths = data.map((brand) => ({ params: { slug: brand.slug.toString() } }));
//    return {
//       paths,
//       fallback: true,
//    };
// };