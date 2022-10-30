import React, { useEffect } from 'react'
import Axios from 'axios';
import Image from 'next/image';
import ProductBox from '../../components/ProductBox';
import { useState } from 'react';

const Product = ({ product }) => {
  const [relatedPro, setRelatedPro] = useState([]);
  useEffect(() => {
    Axios.get(`https://backends.donnachoice.com/api/products/?parents__slug=${product.slug}`)
      .then(res => setRelatedPro(res.data))
    console.log(product);
  }, [product])
  return ( product &&
    <div className='container'>
      <nav className="flex" aria-label="Breadcrumb">
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
                Products
              </span>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                {product && product.name}
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <hr className="my-8 h-px bg-gray-200 border-0" />
      <div className="product grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="images">
          <img src={product.img ? product.img : "https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"} alt="" />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className='text-2xl'>{product && product.name}</h2>
          <p className='text-gray-600'>{product.description ? product.description : "no descrioption"}</p>
          <span className='text-xl text-gray-700'>$ {product.options[0].price}</span>
          <div className='flex gap-4'>
            <button
              className="text-white w-full bg-primary hover:bg-primary/75 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            // onClick={() => dispatch(increment(props.product.slug))}
            >
              Add to cart
            </button>
            <button className='z-10 text-xl border rounded px-4 bg-gray-100 hover:shadow transition hover:scale-105 text-red-600' title='Add product to wishlist' onClick={() => handleWishList(props.product.slug, props.product.is_wishlist)}>
              {/* <button className='z-10' onClick={() => handleWishList(props.product.slug, props.product.is_wishlist)}> */}
              <i className="far fa-heart"></i>
            </button>
            <button className='z-10 text-xl border rounded px-4 bg-gray-100 hover:shadow transition hover:scale-105 text-blue-600' title='Add product to comper list' >
              <i className="fas fa-balance-scale"></i>
            </button>
          </div>
        </div>
      </div>
      <hr className="my-8 h-px bg-gray-200 border-0" />
      <div className="mb-8">
        <h2 className='font-bold text-3xl mb-8'>Related Products</h2>
        <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {relatedPro.map(pro => <ProductBox key={pro.id} product={pro} />)}
        </div>
      </div>
    </div>
  )
}

export default Product;

export const getStaticProps = async ({ params }) => {
  const { data } = await Axios.get(`https://backends.donnachoice.com/api/products/${params.slug}`);
  const product = data;
  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths = async () => {
  const { data } = await Axios.get("https://backends.donnachoice.com/api/products/");
  const paths = data.map((products) => ({ params: { slug: products.slug.toString() } }));
  return {
    paths,
    fallback: true,
  };
};