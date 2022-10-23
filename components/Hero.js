import React from 'react'

const Hero = () => {
   return (
      <div className='hero py-16 bg-url relative'>
         <div className="overlay z-10"></div>
         <div className="container flex flex-col gap-8 text-white relative z-20">
            <h2 className="text-4xl uppercase">
            categories LIST
            </h2>
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
               <li className="inline-flex items-center">
                  <a href="#" className="inline-flex items-center text-sm font-medium">
                     {/* <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> */}
                     <i className="fas fa-home mr-2"></i>
                     Home
                  </a>
               </li>
               <li>
                  <div className="flex items-center">
                     <i className="fas fa-chevron-right"></i>
                     <a href="#" className="ml-1 text-sm font-medium md:ml-2">Projects</a>
                  </div>
               </li>
            </ol>
         </div>
      </div>
   )
}

export default Hero