import React from 'react'
import { useSelector } from 'react-redux';

const CarP = () => {
   const ar = useSelector((state) => state.langs.value);
   return (
      <div dir={ar ? "rtl" : "ltr"} className="container">
         <nav
            className="flex bg-gray-50 py-3 px-5 rounded mb-8 "
            aria-label="Breadcrumb"
         >
            <ol className="inline-flex items-center gap-4">
               <li className="inline-flex items-center">
                  <div role="status" className="w-20 animate-pulse">
                     <div className="h-2.5 bg-gray-200 rounded-full" />
                  </div>
               </li>
               <li aria-current="page">
                  <div role="status" className="w-20 animate-pulse">
                     <div className="h-2.5 bg-gray-200 rounded-full" />
                  </div>
               </li>
            </ol>
         </nav>
         <h2 className="text-3xl text-gray-700">
            <div role="status" className="w-full animate-pulse max-w-md">
               <div className="h-2.5 bg-gray-200 rounded-full" />
            </div>
         </h2>
         <div className="mt-8">
            <div className="hidden lg:block mb-4 border-gray-200 bg-primary-300 text-primary-100  rounded-lg overflow-hidden">
               <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                  <li className="grow px-8">
                     <div
                        className="flex gap-4 justify-center items-center py-4"
                     >
                        <div role="status" className="w-full animate-pulse">
                           <div className="h-2.5 bg-primary-100 rounded-full" />
                        </div>
                     </div>
                  </li>
                  <li className="grow px-8">
                     <div
                        className="flex gap-4 justify-center items-center py-4"
                     >
                        <div role="status" className="w-full animate-pulse">
                           <div className="h-2.5 bg-primary-100 rounded-full" />
                        </div>
                     </div>
                  </li>
                  <li className="grow px-8">
                     <div
                        className="flex gap-4 justify-center items-center py-4"
                     >
                        <div role="status" className="w-full animate-pulse">
                           <div className="h-2.5 bg-primary-100 rounded-full" />
                        </div>
                     </div>
                  </li>
                  <li className="grow px-8">
                     <div
                        className="flex gap-4 justify-center items-center py-4"
                     >
                        <div role="status" className="w-full animate-pulse">
                           <div className="h-2.5 bg-primary-100 rounded-full" />
                        </div>
                     </div>
                  </li>
               </ul>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 mb-8">
               <div className="col-span-8 lg:col-span-6 overflow-x-auto relative h-fit rounded-lg border">
                  <table
                     className={`w-full text-sm text-left text-gray-500 ${ar && "text-right"
                        }`}
                  >
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr className="border-b">
                           <th scope="col" className="p-4">
                              #
                           </th>
                           <th scope="col" className="py-3 px-6">
                              <div role="status" className="w-full animate-pulse">
                                 <div className="h-2.5 bg-gray-200 rounded-full" />
                              </div>
                           </th>
                           <th scope="col" className="py-3 px-6">
                              <div role="status" className="w-full animate-pulse">
                                 <div className="h-2.5 bg-gray-200 rounded-full" />
                              </div>
                           </th>
                           <th scope="col" className="py-3 px-6">
                              <div role="status" className="w-full animate-pulse">
                                 <div className="h-2.5 bg-gray-200 rounded-full" />
                              </div>
                           </th>
                           <th scope="col" className="py-3 px-6"></th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr className="bg-white border-b">
                           <td className="p-4 w-4">
                              <div role="status" className="w-full animate-pulse">
                                 <div className="h-2.5 bg-gray-200 rounded-full" />
                              </div>
                           </td>
                           <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                              <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
                                 <div className="flex justify-center items-center w-full h-12 bg-gray-300 rounded sm:w-46 dark:bg-gray-700">
                                    <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                                 </div>
                                 <div className="h-2.5 bg-gray-200 rounded-full" />
                              </div>
                           </th>
                           <td className="py-4 px-6">
                              <div role="status" className="w-full animate-pulse">
                                 <div className="h-2.5 bg-gray-200 rounded-full" />
                              </div>
                           </td>
                           <td className="py-4 px-6 product-amount">
                              <div role="status" className="w-full animate-pulse">
                                 <div className="h-2.5 bg-gray-200 rounded-full" />
                              </div>
                           </td>
                           <td className="py-4 px-6">
                              <button
                                 className="px-4 py-2 rounded text-xl text-white bg-red-700"
                              >
                                 <div role="status" className="w-full animate-pulse">
                                    <div className="h-2.5 bg-gray-200 rounded-full" />
                                 </div>
                              </button>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div className="col-span-8 lg:col-span-2 flex flex-col gap-4">
                  <div className="bg-gray-50 p-4 border rounded-md">
                     <h4 className="text-2xl mb-4">{ar ? "ملخص" : "SUMMARY"}</h4>
                     <div className="capitalize">
                        <div role="status" className="w-full animate-pulse">
                           <div className="h-2.5 bg-gray-200 rounded-full" />
                        </div>
                     </div>
                     <div className="capitalize">
                        <div role="status" className="w-full animate-pulse">
                           <div className="h-2.5 bg-gray-200 rounded-full" />
                        </div>
                     </div>
                  </div>
                  <button
                     type="button"
                     className="w-full bg-primary-100 text-white rounded-md p-4 flex gap-4"
                  >
                     <div role="status" className="w-full animate-pulse">
                        <div className="h-2.5 bg-primary-300 rounded-full" />
                     </div>
                     <i
                        className={`fas ${ar ? "fa-arrow-left" : "fa-arrow-right"}`}
                     ></i>{" "}
                     <div role="status" className="w-full animate-pulse">
                        <div className="h-2.5 bg-primary-300 rounded-full" />
                     </div>
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CarP