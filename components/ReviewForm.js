import React from 'react'
import { useState } from 'react';

const ReviewForm = () => {
   const [rait, setrait] = useState(1);
   return (
      <div className='fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center p-4'>
         <div className="bg-gray-50 rounded-lg border p-4 space-y-4 w-full max-w-lg">
            <h3 className='text-2xl font-bold'>product name</h3>
            <div className='text-yellow-500 text-2xl'>
            <div className='text-gray-800 text-xl'>Rait</div>
               <button onClick={() => setrait(1)}>
                  <i className={`${rait >= 1 ? "fas" : "far"} fa-star`}></i>
               </button>
               <button onClick={() => setrait(2)}>
                  <i className={`${rait >= 2 ? "fas" : "far"} fa-star`}></i>
               </button>
               <button onClick={() => setrait(3)}>
                  <i className={`${rait >= 3 ? "fas" : "far"} fa-star`}></i>
               </button>
               <button onClick={() => setrait(4)}>
                  <i className={`${rait >= 4 ? "fas" : "far"} fa-star`}></i>
               </button>
               <button onClick={() => setrait(5)}>
                  <i className={`${rait == 5 ? "fas" : "far"} fa-star`}></i>
               </button>
            </div>
            <div>
               <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your review</label>
               <textarea
               id="message"
               rows={4}
               className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Your review..."
               defaultValue={""} />
            </div>
            <button onClick={() => location.reload()} className='py-2 px-4 bg-primary-100 rounded text-white'>submit</button>
         </div>
      </div>
   )
}

export default ReviewForm