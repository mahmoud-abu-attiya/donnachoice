import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import ProductBox from '../components/ProductBox';
import Link from 'next/link';
import Image from 'next/image';
import img from "../public/images/no-result.png"

// export const getStaticProps = async () => {
//    const res = await fetch('https://backends.donnachoice.com/api/products/?slug__in=product,item-2');
//    let products = await res.json();

//    return {
//       props: {
//          products,
//       }
//    }
// }

const Compare = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const storedCompare = JSON.parse(localStorage.getItem("stored-compare")) || []
        if (storedCompare.length < 1) {
            storedCompare.push("---")
        }
        console.log(storedCompare)
        axios.get('https://backends.donnachoice.com/api/products/?slug__in=' + storedCompare).then(res => {
            setProducts(res.data)
            console.log(res.data)
            setLoading(false)
        })
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
            <nav className="flex col-span-9 bg-gray-50 py-3 px-5 rounded " aria-label="Breadcrumb">
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
                                Compare
                            </span>
                        </div>
                    </li>
                </ol>
            </nav>
            {products.length == 0 ? (
                <div className='text-2xl capitalize text-center col-span-4'>
                    <div className="max-w-[300px] mx-auto">
                        <Image src={img} alt="no result" />
                    </div>
                    There no products in compare list. <br />
                    <Link href={"/products"}>
                        <div className='w-full max-w-[500px] text-center bg-primary-100 text-white rounded py-3 px-5 mx-auto cursor-pointer my-8'>
                            Explor products and add to compare
                        </div>
                    </Link>
                </div>
            )
                : (
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
                                {products.map((product, index) => {
                                    return (
                                        <tr key={product.id} className="bg-white border-b">
                                            <td className="p-4 w-4">
                                                {index + 1}
                                            </td>
                                            <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                                <img
                                                    className='h-12 aspect-square object-cover'
                                                    src={product.images.length == 0 ? "https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg" : product.product.images[0].img}
                                                    alt={product.name}
                                                />
                                                {`${product.name} (${product.name})`}
                                            </th>
                                            <td className="py-4 px-6">
                                                {product.options[0].price}
                                            </td>
                                            <td className="py-4 px-6 product-amount">
                                                {product.amount || 1}
                                            </td>
                                            <td className="py-4 px-6 product-total-price">
                                                {product.amount || 1 * product.price}
                                            </td>
                                            <td className="py-4 px-6">
                                                <button className='px-4 py-2 rounded text-xl text-white bg-red-700'>
                                                    <i className="fad fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
        </div>
    )
}

export default Compare

{/* <div className="col-span-8 lg:col-span-6 overflow-x-auto relative h-fit rounded-lg border">
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
</div> */}