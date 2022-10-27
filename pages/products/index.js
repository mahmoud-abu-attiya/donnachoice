import ProductBox from "../../components/ProductBox";
import { useEffect, useState } from "react";
import Hero from "../../components/Hero";
import axios from "axios";

export const getStaticProps = async () => {
   // const proRes = await fetch('https://backends.donnachoice.com/api/products/');
   // let products = await proRes.json();

   const brandRes = await fetch('https://backends.donnachoice.com/api/brand/');
   let brands = await brandRes.json();

   return {
      props: {
         // products,
         brands,
      }
   }
}

export default function Products({  brands }) {
   const [query, setQuery] = useState("");
   const [products, setProducts] = useState([])
   useEffect(() => {
      axios.get("https://backends.donnachoice.com/api/products/").then(res => setProducts(res.data))
      // console.log(products);
   }, []);
   return (
      <div>
         <Hero title="products" />
         <div className="container">
            <div className="grid grid-cols-8 gap-4 py-8">
               <aside className="col-span-2 border-r pr-4">
                  <h3 className="text-2xl">Filter</h3>
                  <div className="flex items-center mb-4">
                     <label htmlFor="simple-search" className="sr-only">Search</label>
                     <div className="relative w-full">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                           <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                        </div>
                        <input onChange={(e) => setQuery(e.target.value)} type="text" id="simple-search" className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5" placeholder="Search" required />
                     </div>
                     {/* <button className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <span className="sr-only">Search</span>
                     </button> */}
                  </div>
                  <h5 className="mb-2">Price Range</h5>
                  <div className="flex gap-4 mb-4">
                     <div className="flex">
                        <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300">
                           MIN
                        </span>
                        <input
                           type="number"
                           id="website-admin"
                           className="rounded-none outline-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-primary focus:border-primary block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                           placeholder="10"
                           min={1}
                        />
                     </div>
                     <div className="flex">
                        <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300">
                           MAX
                        </span>
                        <input
                           type="number"
                           id="website-admin"
                           className="rounded-none outline-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-primary focus:border-primary block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                           placeholder="100"
                           min={1}
                        />
                     </div>
                  </div>
                  <h5 className="mb-2">Brand</h5>

                  <div>
                     <select id="countries" className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5">
                        <option selected>Choose a brand</option>
                        {brands.map((brand) => {
                           return(
                              <option value={brand.slug} key={brand.id}>{brand.name}</option>
                           )
                        })}
                     </select>
                  </div>
                  <div className="py-2">
                     <button type="button" className="text-white w-full bg-gradient-to-r from-primary via-primary to-pink-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Filter</button>
                     <button type="button" className="text-white w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Reset</button>
                  </div>

               </aside>
               <div className="col-span-8 md:col-span-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {products.filter((item) =>
                     item.name.toLowerCase().includes(query.toLowerCase())
                  ).map((product) => {
                     <input type="text" />
                     return (
                        <ProductBox
                           key={product.id}
                           product={product}
                        />
                     )
                  })
                  }
               </div>
            </div>
         </div>
      </div>
   )
}