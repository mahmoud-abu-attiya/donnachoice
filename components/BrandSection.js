import Image from 'next/image'
import React from 'react'
import logo from "../public/images/logo-placeholder.png"

const BrandSection = () => {
   return (
      <a href="#">
         <div className='grid grid-cols-5 items-center bg-gray-100 px-6 py-4 gap-2 border border-gray-300 shadow rounded transition hover:shadow-md hover:scale-105'>
         <div className="col-span-2">
         <Image src={logo} alt="brand logo" />
         </div>
         <div className='col-span-3'>
            <p className='capitalize'>brand name</p>
            <p className='text-sm text-gray-500'>about brand</p>
         </div>
      </div>
      </a>
   )
}

export default BrandSection