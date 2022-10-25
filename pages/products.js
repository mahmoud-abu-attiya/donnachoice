// import Hero from "../components/HomeHero"
import ProductBox from "../components/ProductBox";
import { useEffect } from "react";
import Hero from "../components/Hero";

export const getStaticProps = async () => {
   const res = await fetch('http://3.83.152.24/api/products/');
   let products = await res.json();
   return {
      props: {
         products
      }
   }
}

export default function Products({ products }) {
   useEffect(() => {
      console.log(products);
   }, [products]);
   return (
      <div>
         <Hero title="products" />
         <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 py-8">
               {products.map((product) => {
                  return (
                     <ProductBox
                        key={product.id}
                        img={product.img}
                        id={product.id}
                        slug={product.slug}
                        name={product.name}
                        price={product.price}
                     />
                  )
               })
               }
            </div>
         </div>
      </div>
   )
}