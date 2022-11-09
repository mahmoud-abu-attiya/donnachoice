import React from 'react'
import { useSelector } from 'react-redux';

const PorfileP = () => {
   const ar = useSelector((state) => state.langs.value);
   return (
      <div
         dir={ar ? "rtl" : "ltr"}
         className="container grid grid-cols-9 gap-8 py-8"
      >
         <nav
            className="flex bg-gray-50 py-3 px-5 rounded mb-8 col-span-9"
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
         <aside className="col-span-9 lg:col-span-2" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded-lg border">
               <ul className="lg:space-y-2 flex justify-between items-center lg:items-stretch lg:flex-col">
                  <li className="hidden sm:block">
                     <a
                        href="#"
                        className="flex items-center gap-3 p-2 text-base font-normal text-gray-900 rounded-lg bg-gray-100"
                     >
                        <i className="fad fa-user text-gray-500 text-xl hidden sm:block"></i>
                        <span>
                           <div role="status" className="w-20 animate-pulse">
                              <div className="h-2.5 bg-gray-200 rounded-full" />
                           </div>
                        </span>
                     </a>
                  </li>
                  <li>
                     <a className="flex items-center gap-2 p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                        <i className="fad fa-heart text-gray-500 text-xl hidden sm:block"></i>
                        <div role="status" className="w-20 animate-pulse">
                           <div className="h-2.5 bg-gray-200 rounded-full" />
                        </div>
                     </a>
                  </li>
                  <li>
                     <a
                        className="flex items-center gap-2 p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                     >
                        <i className="fad fa-shopping-cart text-gray-500 text-xl hidden sm:block"></i>
                        <div role="status" className="w-20 animate-pulse">
                           <div className="h-2.5 bg-gray-200 rounded-full" />
                        </div>
                     </a>
                  </li>
                  <li>
                     <a
                        className="flex items-center gap-2 p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                     >
                        <i className="fad fa-random text-gray-500 text-xl hidden sm:block"></i>
                        <div role="status" className="w-20 animate-pulse">
                           <div className="h-2.5 bg-gray-200 rounded-full" />
                        </div>
                     </a>
                  </li>
               </ul>
               <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200">
                  <li>
                     <button
                        className="flex w-full gap-2 items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100"
                     >
                        <div role="status" className="w-20 animate-pulse">
                           <div className="h-2.5 bg-gray-200 rounded-full" />
                        </div>
                     </button>
                  </li>
               </ul>
            </div>
         </aside>
         <div className="col-span-9 lg:col-span-7 space-y-4">
            <div className="head capitalize flex gap-4 items-center text-xl md:text-3xl">
               <i className="fad fa-user-circle text-gray-600 text-5xl"></i>
               <div role="status" className="w-40 animate-pulse">
                  <div className="h-3 bg-gray-300 rounded-full" />
               </div>
            </div>
            <div className="info grid grid-cols-8 bg-gray-50 rounded-md border max-w-full overflow-x-auto">
               <div className="col-span-3 md:col-span-2">
                  <div className="py-2 px-4 border-b">
                     <div role="status" className="w-20 animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full" />
                     </div>
                  </div>
                  <div className="py-2 px-4 border-b">
                     <div role="status" className="w-20 animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full" />
                     </div>
                  </div>
                  <div className="py-2 px-4 border-b">
                     <div role="status" className="w-20 animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full" />
                     </div>
                  </div>
                  <div className="py-2 px-4 ">
                     <div role="status" className="w-20 animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full" />
                     </div>
                  </div>
               </div>
               <div className="text-gray-700 col-span-5 md:col-span-6">
                  <div
                     className={`py-2 px-4 capitalize ${ar ? "border-r" : "border-l"
                        } border-b`}
                  >
                     <div role="status" className="w-[30%] min-w-[5rem] animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full" />
                     </div>
                  </div>
                  <div
                     className={`py-2 px-4 capitalize ${ar ? "border-r" : "border-l"
                        } border-b`}
                  >
                     <div role="status" className="w-[40%] min-w-[5rem] animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full" />
                     </div>
                  </div>
                  <div
                     className={`py-2 px-4 ${ar ? "border-r" : "border-l"} border-b`}
                  >
                     <div role="status" className="w-[20%] min-w-[5rem] animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full" />
                     </div>
                  </div>
                  <div className={`py-2 px-4 ${ar ? "border-r" : "border-l"}`}>
                     <div role="status" className="w-[50%] min-w-[5rem] animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full" />
                     </div>
                  </div>
               </div>
            </div>
            <div className="space-y-4">
               <h4 className="text-xl font-bold">
                  <div role="status" className="w-40 animate-pulse">
                     <div className="h-3 bg-gray-300 rounded-full" />
                  </div>
               </h4>
               <div className="overflow-x-auto relative shadow-md sm:rounded-lg border">
                  <table className="w-full text-sm text-left text-gray-500">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                        <tr>
                           <th scope="col" className="py-3 px-6">
                              <div role="status" className="w-20 animate-pulse">
                                 <div className="h-2.5 bg-gray-200 rounded-full" />
                              </div>
                           </th>
                           <th scope="col" className="py-3 px-6">
                              <div role="status" className="w-20 animate-pulse">
                                 <div className="h-2.5 bg-gray-200 rounded-full" />
                              </div>
                           </th>
                           <th scope="col" className="py-3 px-6">
                              <div role="status" className="w-20 animate-pulse">
                                 <div className="h-2.5 bg-gray-200 rounded-full" />
                              </div>
                           </th>
                           <th scope="col" className="py-3 px-6">
                              <div role="status" className="w-20 animate-pulse">
                                 <div className="h-2.5 bg-gray-200 rounded-full" />
                              </div>
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr className="bg-white border-b">
                           <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                              <div role="status" className="w-20 animate-pulse">
                                 <div className="h-2.5 bg-gray-200 rounded-full" />
                              </div>
                           </th>
                           <td className="py-4 px-6 whitespace-nowrap">
                              <div role="status" className="w-20 animate-pulse">
                                 <div className="h-2.5 bg-gray-200 rounded-full" />
                              </div>
                           </td>
                           <td className="py-4 px-6">
                              <div role="status" className="w-20 animate-pulse">
                                 <div className="h-2.5 bg-gray-200 rounded-full" />
                              </div>
                           </td>
                           <td className="py-4 px-6 flex-col flex gap-2">
                              <a className="p-2 bg-primary-100 rounded">
                                 <div role="status" className="w-[50%] mx-auto animate-pulse">
                                    <div className="h-2.5 bg-primary-300 rounded-full" />
                                 </div>
                              </a>
                              <a className="p-2 bg-primary-100 rounded">
                                 <div role="status" className="w-[50%] mx-auto animate-pulse">
                                    <div className="h-2.5 bg-primary-300 rounded-full" />
                                 </div>
                              </a>
                              <a className="p-2 bg-primary-100 rounded">
                                 <div role="status" className="w-[50%] mx-auto animate-pulse">
                                    <div className="h-2.5 bg-primary-300 rounded-full" />
                                 </div>
                              </a>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PorfileP