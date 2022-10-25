import React from 'react'
import Axios from "axios";

const Cat = ({ brands }) => {
   return (
      <div>
         {brands && brands.length != 0 ?
            brands.map((brand) => {
               return (
                  <div key={brand.id}>
                     <p>{brand.id}</p>
                     <p>{brand.name}</p>
                     <p>{brand.slug}</p>
                  </div>
               )
            }) : (
               <div>no brands in this category</div>
            )
         }
      </div>
   )
}

export default Cat

export const getStaticProps = async ({ params }) => {
   const { data } = await Axios.get(`http://3.83.152.24/api/brand/?category=${params.slug}`);
   const brands = data;
   return {
      props: {
         brands,
      },
   };
};

export const getStaticPaths = async () => {
   const { data } = await Axios.get("http://3.83.152.24/api/brand/?category");
   const paths = data.map((brands) => ({ params: { slug: brands.slug.toString() } }));
   return {
      paths,
      fallback: true,
   };
};