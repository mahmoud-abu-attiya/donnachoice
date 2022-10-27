import React from 'react'
import { useEffect } from 'react';
import ProductBox from '../components/ProductBox';

export const getStaticProps = async () => {
   const res = await fetch('https://backends.donnachoice.com/api/products/?is_wishlist=1');
   let products = await res.json();

   return {
      props: {
         products,
      }
   }
}

const WishList = ({products}) => {
   useEffect(() => {
      console.log(products);
   }, [products]);
   return (
      <div className='container'>{products.length == 0 ? "there is no products in with list yet." : (
         products.map(product => {
            return(
               <ProductBox key={product.id} product={product} />
            )
         })
      )}</div>
   )
}

export default WishList