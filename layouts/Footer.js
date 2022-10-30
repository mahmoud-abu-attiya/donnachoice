import React from 'react'

const Footer = () => {
   return (
      <footer className=" bg-gray-100 ">
         <div className="container md:flex md:justify-between p-4 sm:p-6">
            <div className="mb-6 md:mb-0 grow">
               <a href="#" className="flex items-center">
                  <img src="https://donnachoice.com/wp-content/uploads/2022/06/donnachoice-4.png" className="mr-5 h-10 drop-shadow" alt="FlowBite Logo" />
               </a>
               <p className='max-w-sm'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora tenetur iure amet a. Consequatur, eos optio deleniti atque delectus facilis in ut accusantium nulla! Ullam minima possimus rem ex quae.
               </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
               <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
                  <ul className="text-gray-600">
                     <li className="mb-4">
                        <a href="#" className="hover:underline">Flowbite</a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">Tailwind CSS</a>
                     </li>
                  </ul>
               </div>
               <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
                  <ul className="text-gray-600">
                     <li className="mb-4">
                        <a href="#" className="hover:underline ">Github</a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">Discord</a>
                     </li>
                  </ul>
               </div>
               <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
                  <ul className="text-gray-600">
                     <li className="mb-4">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className=" bg-primary-200 text-gray-100 p-4 sm:p-6">
            <div className="container sm:flex sm:items-center sm:justify-between">
               <span className="text-sm sm:text-center capitalize inline-block">developed by <a href="https://orizon.qa" className='font-bold hover:underline hover:text-black'>Orizon Qatar</a></span>
               <span className="text-sm sm:text-center capitalize inline-block">© 2022 All Copy right reserved to <strong>DONNA CHOICE</strong></span>
               <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                  <a href="#" className="hover:text-gray-900">
                  <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="hover:text-gray-900">
                  <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="hover:text-gray-900">
                     <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="hover:text-gray-900">
                  <i className="fab fa-whatsapp"></i>
                  </a>
                  <a href="#" className="hover:text-gray-900">
                  <i className="fab fa-snapchat-ghost"></i>
                  </a>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default Footer