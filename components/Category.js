import Link from 'next/link'
import React from 'react'

const Category = () => {
   return (
      <Link href={"#"}>
         <a 
         className="min-h-[150px] shadow-md catigory_box relative overflow-hidden rounded-lg p-8">
            <div className="absolute top-0 left-0 w-full h-full"></div>
         </a>
      </Link>
   )
}

export default Category