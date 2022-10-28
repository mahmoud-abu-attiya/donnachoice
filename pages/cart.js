import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import ProductBox from '../components/ProductBox';

// export const getStaticProps = async () => {
//    const res = await fetch('https://backends.donnachoice.com/api/products/?slug__in=product,item-2');
//    let products = await res.json();

//    return {
//       props: {
//          products,
//       }
//    }
// }

const cart = () => {
   const [products, setProducts] = useState([])
   const [loading, setLoading] = useState(true)
   useEffect(() => {
      const auth = false
      if(!auth){
         const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || []
         if(storedCart.length < 1){
            storedCart.push("---")
         }
         console.log(storedCart)
         axios.get('https://backends.donnachoice.com/api/products/?slug__in=' + storedCart).then(res => {
            setProducts(res.data)
            setLoading(false)
         })
      }else{
         axios.get('https://backends.donnachoice.com/api/products/?is_wishlist=1').then(res => {
            setProducts(res.data)
            setLoading(false)
         })
      }
   }, []);

   if(loading){
      return <>
         <div>
            <p>Loading</p>
         </div>
      </>
   }

   return (
      <div className='container p-5 flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
         {products.length == 0 ? "there is no products in cart yet."
         : (
         products.map(product => {
            return(
               <ProductBox key={product.id} product={product} />
            )
         })
      )}</div>
   )
}

export default cart