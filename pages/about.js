import Link from 'next/link'
import React from 'react'
import Hero from '../components/Hero'

export default function about() {
   return (
      <>
         <Hero title="about us" />
         <div className="container text-center py-10">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
               We invest in the world’s potential
            </h1>
            <p className="mb-6 text-lg text-start font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis ipsa, optio provident ab officiis mollitia alias neque sunt voluptatum beatae magnam? Cupiditate aliquid nisi voluptatibus architecto officia odit eum quasi.
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis ipsa, optio provident ab officiis mollitia alias neque sunt voluptatum beatae magnam? Cupiditate aliquid nisi voluptatibus architecto officia odit eum quasi.
            </p>
            <Link href={"/help"}>
               <a className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                  Get touch with us
               </a>
            </Link>
         </div>
      </>
   )
}