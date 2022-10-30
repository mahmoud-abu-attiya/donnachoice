import React from 'react'
import Hero from '../components/Hero'

export default function help() {
   return (
      <>
         <Hero title="contact us" />
         <div className="container">
            <div className='grid grid-cols-1 md:grid-cols-3 justify-center my-6 md:my-8 gap-8'>
               <div className='flex flex-col gap-4 text-center'>
                  <div className="bg-gray-100 p-10 rounded w-fit mx-auto relative shadow">
                     <i className="fas fa-map-marker-alt text-gray-500 drop-shadow text-4xl absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%)" }}></i>
                  </div>
                  <h3 className='text-2xl font-bold capitalize'>location</h3>
                  <p className='mb-8 lg:mb-16 font-light text-gray-500'>
                     <a href="https://google.com/maps" target={"_blank"} rel="noreferrer" className='text-blue-700 font-normal hover:underline'>
                        SILVER LAKE, United States 1941
                     </a> <br />
                     Zip Code/Postal code:03875
                  </p>
               </div>
               <div className='flex flex-col gap-4 text-center'>
                  <div className="bg-gray-100 p-10 rounded w-fit mx-auto relative shadow">
                     <i className="fas fa-phone-alt text-gray-500 drop-shadow text-4xl absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%)" }}></i>
                  </div>
                  <h3 className='text-2xl font-bold capitalize'>call us</h3>
                  <p className='mb-8 lg:mb-16 font-light text-gray-500'>
                     Call us to speak to a member of our team. We are always happy to help. <br />
                     <a href="tel:0123456789" className='text-blue-700 font-normal hover:underline'>+012 345 6789</a>
                  </p>
               </div>
               <div className='flex flex-col gap-4 text-center'>
                  <div className="bg-gray-100 p-10 rounded w-fit mx-auto relative shadow">
                     <i className="fas fa-envelope text-gray-500 drop-shadow text-4xl absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%)" }}></i>
                  </div>
                  <h3 className='text-2xl font-bold capitalize'>e-mail</h3>
                  <p className='mb-8 lg:mb-16 font-light text-gray-500'>
                     Nam voluptatum nulla error pariatur eveniet animi at. <br />
                     <a href="mailto:company@info.com" className='text-blue-700 font-normal hover:underline'>company@info.com</a>
                  </p>
               </div>
               {/* <div>phone</div>
               <div>email</div> */}
            </div>
            <section className="bg-white">
               <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                  <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Contact Us</h2>
                  <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
                  <form action="#" className="space-y-8">
                     <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="name@flowbite.com" required />
                     </div>
                     <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
                        <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" placeholder="Let us know how we can help you" required />
                     </div>
                     <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your message</label>
                        <textarea id="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Leave a comment..." defaultValue={""} />
                     </div>
                     <button type="submit" className="text-white max-w-screen-md w-full bg-gradient-to-r from-primary-200 via-primary-200 to-pink-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Send</button>
                  </form>
               </div>
            </section>

         </div>
      </>
   )
}
