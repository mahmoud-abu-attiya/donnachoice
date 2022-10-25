import Link from 'next/link'
import React from 'react'

const Section = (props) => {
   return (
      <Link href={`/categories/${props.slug}`}>
         <a
            className="min-h-[150px] shadow-md catigory_box relative overflow-hidden rounded-lg p-8">
            <div
               className="absolute top-0 left-0 w-full h-full"
               style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("${props.img}")` }}>
            </div>
         </a>
      </Link>
   )
}

export default Section