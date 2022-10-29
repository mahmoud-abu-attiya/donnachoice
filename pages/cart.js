import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useEffect } from 'react';
import CartItem from '../components/CartItem';

// export const getStaticProps = async () => {
//    const res = await fetch('https://backends.donnachoice.com/api/products/?slug__in=product,item-2');
//    let products = await res.json();

//    return {
//       props: {
//          products,
//       }
//    }
// }

const Cart = () => {
   const [products, setProducts] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const auth = Cookies.get("auth")
      if (!auth) {
         const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || []
         if (storedCart.length < 1) {
            storedCart.push("---")
         }
         console.log(storedCart)
         const storedCartIds = storedCart.map(item => item.id)
         axios.get(`https://backends.donnachoice.com/api/products/options/?ids=${storedCartIds}`).then(res => {
            console.log(res.data)
            setProducts(res.data)
            setLoading(false)
         })
      } else {
         axios.get('https://backends.donnachoice.com/api/products/cart/', {
            headers: {
               Authorization: `Bearer ${Cookies.get("token")}`,
            },
         }).then(res => {
            setProducts(res.data)
            setLoading(false)
         })
      }
   }, []);

   if (loading) {
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
               return (
                  <CartItem key={product.id} product={product} />
               )
            })
         )}</div>
   )
}

export default Cart