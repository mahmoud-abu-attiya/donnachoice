import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react'
import CartItem from '../components/CartItem';
import Image from 'next/image';
import img from "../public/images/empty-cart.png"
import Link from 'next/link';
import { useDispatch } from 'react-redux'
import { setCartCount } from "../slices/cartIndicatorSlice"

// export const getStaticProps = async () => {
//    const res = await fetch('https://backends.donnachoice.com/api/products/?slug__in=product,item-2');
//    let products = await res.json();

//    return {
//       props: {
//          products,
//       }
//    }
// }

const getNumberOfProductsInCart = () => {
   const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || []
   return storedCart.length
}

const handleCartLocalStorage = (itemId) => {
   const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || []
   const storedCartIds = storedCart.map(cartId => cartId.id)
   if (storedCartIds.includes(itemId)) {
      for (let i = 0; i < storedCart.length; i++) {
         if (storedCart[i].id === itemId) {
            storedCart.splice(i, 1)
            break
         }
      }
   }
   localStorage.setItem("stored-cart", JSON.stringify(storedCart))
}

const Cart = () => {
   const [products, setProducts] = useState([])
   const [loading, setLoading] = useState(true)
   const [totalAmount, setTotalAmount] = useState(0)
   const [totalPrice, setTotalPrice] = useState(0)
   const dispatch = useDispatch()

   useEffect(() => {
      const amounts = document.querySelectorAll(".product-amount")
      const prices = document.querySelectorAll(".product-total-price")
      setTotalAmount(0)
      setTotalPrice(0)
      for (let i = 0; i < amounts.length; i++) {
         setTotalAmount(x => x + parseInt(amounts[i].textContent))
      }
      for (let i = 0; i < prices.length; i++) {
         setTotalPrice(x => x + parseInt(prices[i].textContent))
      }
   }, [loading])

   useEffect(() => {
      const auth = Cookies.get("auth")
      if (auth) {
         axios.get('https://backends.donnachoice.com/api/products/cart/', {
            headers: {
               Authorization: `Bearer ${Cookies.get("token")}`,
            },
         }).then(res => {
            setProducts(res.data)
            setLoading(false)
         })
      } else {
         const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || []
         if (storedCart.length < 1) {
            storedCart.push("---")
            setProducts([])
            setLoading(false)
            return
         }
         console.log(storedCart)
         const storedCartIds = storedCart.map(item => item.id)
         axios.get(`https://backends.donnachoice.com/api/products/options/?ids=${storedCartIds}`).then(res => {
            console.log(res.data)
            setProducts(res.data)
            setLoading(false)
         })
      }
   }, [loading]);

   const removeProductFromCart = (itemId) => {
      setLoading(true)
      const auth = Cookies.get("auth")
      if (!auth) {
         handleCartLocalStorage(itemId)
         dispatch(setCartCount(getNumberOfProductsInCart()))
         return
      }
   }

   if (loading) {
      return <>
         <div>
            <p>Loading</p>
         </div>
      </>
   }

   return (
      // <div className='container p-5 flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      //    {products.length == 0 ? "there is no products in cart yet."
      //    : (
      //       products.map(product => {
      //          return (
      //             <CartItem key={product.id} product={product} />
      //          )
      //       })
      //    )}</div>
      <div className="container">

         <nav className="flex col-span-9 bg-gray-50 py-3 px-5 rounded mb-8 " aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
               <li className="inline-flex items-center">
                  <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                     <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                     Home
                  </a>
               </li>
               <li>
                  <div className="flex items-center">
                     <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                     <span className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2">
                        Cart
                     </span>
                  </div>
               </li>
               <li aria-current="page">
                  <div className="flex items-center">
                     <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                     <span className="ml-1 capitalize text-sm font-medium text-gray-500 md:ml-2">
                        Checkout
                     </span>
                  </div>
               </li>
            </ol>
         </nav>
         <h2 className='text-3xl text-gray-700'>Delivery Details / <span className="text-sm">Add new or use existing delivery address.</span></h2>

         <div className='mt-8'>
            <div className="hidden lg:block mb-4 border-gray-200 bg-primary-300 text-primary-100  rounded-lg overflow-hidden">
               <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                  <li className="grow bg-primary-100 text-primary-300">
                     <a href="" className='flex gap-4 justify-center items-center py-4 border-r border-primary-100'>
                        <i className="fad fa-bags-shopping text-xl"></i>
                        Cart items
                     </a>
                  </li>
                  <li className="grow">
                     <a href="" className='flex gap-4 justify-center items-center py-4 border-r border-primary-100'>
                        <i className="fad fa-truck-loading text-xl"></i>
                        Delivery Details
                     </a>
                  </li>
                  <li className="grow">
                     <a href="" className='flex gap-4 justify-center items-center py-4 border-r border-primary-100'>
                        <i className="fad fa-credit-card text-xl"></i>
                        Payment Options
                     </a>
                  </li>
                  <li className="grow">
                     <a href="" className='flex gap-4 justify-center items-center py-4'>
                        <i className="fad fa-check-square text-xl"></i>
                        Confirm order
                     </a>
                  </li>
               </ul>
            </div>
            {products.length == 0 ? (
               <div className='text-2xl capitalize text-center col-span-4'>
                  <div className="max-w-[500px] mx-auto">
                     <Image src={img} alt="no result" />
                  </div>
                  There no products in your cart. <br />
                  <Link href={"/products"}>
                     <div className='w-full max-w-[200px] text-center bg-primary-100 text-white rounded py-3 px-5 mx-auto cursor-pointer my-8'>
                        Shopping Now
                     </div>
                  </Link>
               </div>
            ) : (
               <div className='grid grid-cols-1 lg:grid-cols-8 gap-4 mb-8'>
                  <div className="col-span-8 lg:col-span-6 overflow-x-auto relative h-fit rounded-lg border">
                     <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                           <tr className='border-b'>
                              <th scope="col" className="p-4">
                                 #
                              </th>
                              <th scope="col" className="py-3 px-6">
                                 Product
                              </th>
                              <th scope="col" className="py-3 px-6">
                                 Price (QA)
                              </th>
                              <th scope="col" className="py-3 px-6">
                                 Count
                              </th>
                              <th scope="col" className="py-3 px-6">
                                 Total (QA)
                              </th>
                              <th scope="col" className="py-3 px-6">
                                 Action
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           {products.length == 0 ? "there is no products in cart yet."
                              : (
                                 products.map((product, index) => {
                                    return (
                                       <tr key={product.id} className="bg-white border-b">
                                          <td className="p-4 w-4">
                                             {index + 1}
                                          </td>
                                          <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                             <img
                                                className='h-12 aspect-square object-cover'
                                                src={product.product.images.length == 0 ? "https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg" : product.product.images[0].img}
                                                alt={product.product.name}
                                             />
                                             {`${product.product.name} (${product.name})`}
                                          </th>
                                          <td className="py-4 px-6">
                                             {product.price}
                                          </td>
                                          <td className="py-4 px-6 product-amount">
                                             {product.amount || 1}
                                          </td>
                                          <td className="py-4 px-6 product-total-price">
                                             {product.amount || 1 * product.price}
                                          </td>
                                          <td className="py-4 px-6">
                                             <button onClick={() => removeProductFromCart(product.id)} className='px-4 py-2 rounded text-xl text-white bg-red-700'>
                                                <i className="fad fa-trash-alt"></i>
                                             </button>
                                          </td>
                                       </tr>
                                    )
                                 })
                              )}

                        </tbody>
                     </table>
                  </div>
                  <div className="col-span-8 lg:col-span-2 flex flex-col gap-4">
                     <div className="bg-gray-50 p-4 border rounded-md">
                        <h4 className='text-2xl mb-4'>SUMMARY</h4>
                        <div className='capitalize'>total items: <span className='text-xl font-bold'>{totalAmount}</span></div>
                        <div className='capitalize'>total price (QR) : <span className='text-xl font-bold'>{totalPrice}</span></div>
                     </div>
                     <button className='w-full bg-primary-100 text-white rounded-md py-4'>Next <i className="fas fa-arrow-right"></i> Delivery</button>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default Cart
