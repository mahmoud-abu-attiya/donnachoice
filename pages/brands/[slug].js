import React from 'react'
import Axios from "axios";

const Brand = ({ brand }) => {
   return (
      <div>{brand.name}</div>
   )
}

export default Brand

export const getStaticProps = async ({ params }) => {
   const { data } = await Axios.get(`http://3.83.152.24/api/brand/${params.slug}`);
   const brand = data;
   return {
      props: {
         brand,
      },
   };
};

export const getStaticPaths = async () => {
   const { data } = await Axios.get("http://3.83.152.24/api/brand/");
   const paths = data.map((brand) => ({ params: { slug: brand.slug.toString() } }));
   return {
      paths,
      fallback: true,
   };
};