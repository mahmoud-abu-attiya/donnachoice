import Link from 'next/link'
import React from 'react'

const Subnav = () => {
   return (
      <div className='bg-primary px-2 sm:px-4 py-2.5 text-white'>
         <div className="container flex justify-between items-center flex-wrap">
            <div className="flex gap-4">
               <a href="#">
                  {/* <i className="fas fa-facebook-f"></i> */}
                  <i className="fab fa-facebook-f"></i>
               </a>
               <a href="#">
                  <i className="fab fa-snapchat-ghost"></i>
               </a>
               <a href="#">
                  <i className="fab fa-instagram"></i>
               </a>
               <a href="#">
                  <i className="fas fa-envelope"></i>
               </a>
               <a href="#">
                  <i className="fab fa-whatsapp"></i>
               </a>
            </div>
            <div className="phone">
               <a href="#"><i className="fas fa-phone-alt"></i> +123 456 7890</a>
            </div>
            <div className="whats flex gap-2 items-center">
               <img src="https://d2tsjbw4u8kqa2.cloudfront.net/images/1612601586601e58f26676c0.82320448.jpeg" alt="" className='h-4' />
               qa
            </div>
            <div className="whats flex items-center">
               <svg className="mr-1 g-ml-minus-10" xmlns="http://www.w3.org/2000/svg" height="11" width="27" viewBox="0 0 640 480">
                  <defs>
                     <clipPath id="a">
                        <path fillOpacity=".67" d="M-85.333 0h682.67v512h-682.67z"></path>
                     </clipPath>
                  </defs>
                  <g clipPath="url(#a)" transform="translate(80) scale(.94)">
                     <g strokeWidth="1pt">
                        <path fill="#006" d="M-256 0H768.02v512.01H-256z"></path>
                        <path d="M-256 0v57.244l909.535 454.768H768.02V454.77L-141.515 0H-256zM768.02 0v57.243L-141.515 512.01H-256v-57.243L653.535 0H768.02z" fill="#fff"></path>
                        <path d="M170.675 0v512.01h170.67V0h-170.67zM-256 170.67v170.67H768.02V170.67H-256z" fill="#fff"></path>
                        <path d="M-256 204.804v102.402H768.02V204.804H-256zM204.81 0v512.01h102.4V0h-102.4zM-256 512.01L85.34 341.34h76.324l-341.34 170.67H-256zM-256 0L85.34 170.67H9.016L-256 38.164V0zm606.356 170.67L691.696 0h76.324L426.68 170.67h-76.324zM768.02 512.01L426.68 341.34h76.324L768.02 473.848v38.162z" fill="#c00"></path>
                     </g>
                  </g>
               </svg>
               English
            </div>
            <div className="links capitalize">
               <Link href={"#"}>
                  <a className='border-r px-4 border-gray-900/25'>
                     about us
                  </a>
               </Link>
               <Link href={"#"}>
                  <a className='border-r px-4 border-gray-900/25'>
                     Account
                  </a>
               </Link>
               <Link href={"#"}>
                  <a className='px-4'>
                     Help
                  </a>
               </Link>
            </div>
            <div className="wcs flex gap-4">
               <Link href={"#"}>
                  <a className="wish_list">
                  <i className="fas fa-heart"></i>
               </a>
               </Link>
               <Link href={"#"}>
                  <a className="cart">
                  <i className="fas fa-shopping-cart"></i>
               </a>
               </Link>
               <Link href={"#"}>
                  <a className="search">
                  <i className="fas fa-search"></i>
               </a>
               </Link>
            </div>
         </div>
      </div>
   )
}

export default Subnav