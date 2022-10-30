import ProductBox from "../../components/ProductBox";
import { useEffect, useState } from "react";
import Hero from "../../components/Hero";
import axios from "axios";
import Cookies from 'js-cookie'
import Image from "next/image";
import img from "../../public/images/no-result.png"

export const getStaticProps = async () => {
   const brandRes = await fetch('https://backends.donnachoice.com/api/brand/');
   let brands = await brandRes.json();

   const categoryRes = await fetch('https://backends.donnachoice.com/api/category/');
   let categorys = await categoryRes.json();
   return {
      props: {
         brands,
         categorys,
      }
   }
}

export default function Products({ brands, categorys }) {
   const [query, setQuery] = useState("");
   const [products, setProducts] = useState([]);
   const [categorySlug, setCategorySlug] = useState();
   const [searchQuery, setSearchQuery] = useState("")
   const [Floading, setFloading] = useState(false);
   const [smScreen, setSmScreen] = useState(false);
   const [filterPopup, setFilterPopup] = useState(false);
   useEffect(() => {
      if (window.innerWidth < 1023) {
         setSmScreen(true);
      }
      let urlparam = window.location.search
      setSearchQuery(urlparam)
      let filter_btn = document.getElementById("filter_btn")
      filter_btn.onclick = () => {
         
         let fields = document.querySelectorAll("aside [name]")
         let q = "?"
         fields.forEach(field => {
            if (field.value) {
               q += `${field.name}=${field.value}&`
            }
         })
         setSearchQuery(q);
      }
   }, [])
   useEffect(() => {
      setFloading(true)
      const brandSlug = window.location.search.split("&")[0].split("=")[1]
      const URL = `https://backends.donnachoice.com/api/products/${searchQuery}`
      const auth = Cookies.get("auth")
      if (!auth) {
         axios.get(URL).then(res => {
            setFloading(false)
            setFilterPopup(false)
            console.log(res.data);
            setProducts(res.data)
         })
      } else {
         axios.get(URL, {
            headers: {
               Authorization: `Bearer ${Cookies.get("token")}`
            }
         }).then(res => {
            setFloading(false)
            setFilterPopup(false)
            console.log(res.data);
            setProducts(res.data)
         })
      }
   }, [searchQuery]);
   return (
      <div>
         <Hero title="products" />
         <div className="container">
            <div className="grid grid-cols-8 gap-4 py-8">
               <aside className={`filter col-span-2 border-r md:pr-4 ${filterPopup ? "flex" : "hidden"} `}>
                  <div className="max-w-[400px] space-y-4">
                     <h3 className="text-2xl">Filter</h3>
                     <div className="flex items-center mb-4">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                           <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                              <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                           </div>
                           <input name="q" type="text" id="simple-search" className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5" placeholder="Search" required />
                        </div>
                     </div>
                     <div>
                        <h5 className="mb-2">Price Range</h5>
                        <div className="flex gap-4 mb-4">
                           <div className="flex">
                              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300">
                                 Min
                              </span>
                              <input
                                 type="number"
                                 id="lt"
                                 name="options__price__gte"
                                 className="rounded-none outline-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-primary focus:border-primary block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                                 placeholder="10"
                                 min={1}
                              />
                           </div>
                           <div className="flex">
                              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300">
                                 Max
                              </span>
                              <input
                                 type="number"
                                 id="gt"
                                 name="options__price__lte"
                                 className="rounded-none outline-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-primary focus:border-primary block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                                 placeholder="100"
                                 min={1}
                              />
                           </div>
                        </div>
                     </div>
                     <div>
                        <h5 className="mb-2">Brand</h5>
                        <select id="countries" name="brand__slug" className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5">
                           <option value={""}>Choose a brand</option>
                           {brands.map((brand) => {
                              return (
                                 <option selected={searchQuery.includes(`brand__slug=${brand.slug}`) ? true : false} value={brand.slug} key={brand.id}>{brand.name}</option>
                              )
                           })}
                        </select>
                     </div>
                     <div>
                        <h5 className="mb-2">Categorys</h5>
                        <select id="countries" name="category__slug" className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5">
                           <option value={""}>Choose a categoreis</option>
                           {categorys.map((cat) => {
                              return (
                                 <option selected={searchQuery.includes(`category__slug=${cat.slug}`) ? true : false} value={cat.slug} key={cat.id}>{cat.name}</option>
                              )
                           })}
                        </select>
                     </div>
                     <div className="py-2">
                        <button type="button" id="filter_btn" className="text-white w-full bg-gradient-to-r from-primary via-primary to-pink-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">

                           {!Floading ? "Filter" : (
                              <div role="status" className="w-fit mx-auto">
                                 <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                 </svg>
                                 <span className="sr-only">Loading...</span>
                              </div>
                           )}
                        </button>
                        <button
                        type="button"
                        id="reset_filter"
                        className="text-white w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={() => setSearchQuery("")}
                        >

                           Reset
                           </button>
                     </div>
                  </div>

               </aside>
                  <button onClick={() => setFilterPopup(true)} className="filter_btn col-span-8 max-w-[10rem] px-5 py-3 bg-gray-100 shadow hidden gap-4 items-center text-xl text-primary border rounded">
                     <i className="fas fa-filter"></i>
                     Fillter
                  </button>
                  <hr className="block lg:hidden my-4 h-px bg-gray-200 border-0 col-span-8" />
               <div className="col-span-8 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* {categorySlug && (
                  <div className='col-span-3 bg-gray-700 text-primary border px-5 py-3 w-fit capitalize text-2xl rounded-md flex items-center gap-4'>
                  <span className="text-sm">category:</span>
                  {categorySlug}
                  <button onClick={() => setCategorySlug("")}><i className="fas fa-times text-red-700   "></i></button>
               </div>
               )} */}
                  {products.length > 0 ? products.filter((item) =>
                     item.name.toLowerCase().includes(query.toLowerCase())
                  ).map((product) => {
                     <input type="text" />
                     return (
                        <ProductBox
                           key={product.id}
                           product={product}
                        />
                     )
                  }) : (
                     <div className='text-2xl capitalize text-center col-span-4'>
                        there no products matching your filter
                        <div className="max-w-[500px] mx-auto">
                           <Image src={img} alt="no result" />
                        </div>
                     </div>
                  )
                  }
               </div>
            </div>
         </div>
      </div>
   )
}