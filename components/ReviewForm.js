import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import swal from 'sweetalert';


const ReviewForm = (props) => {
   const ar = useSelector(state => state.langs.value)
   const [rate, setrait] = useState(1);

   useEffect(() => {
      console.log(props.item.option.product.name);
   }, []);

   const review = () => {
      const RAIT = {
         product: props.item.option.product.id,
         rate: rate,
         comment: message.value
      }
      axios.post(`https://backends.donnachoice.com/api/products/${props.item.option.product.slug}/rate/`, RAIT ,{
         headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
         },
      })
      .then(res => {
         swal("Review Done!", `You just review ${props.item.option.product.slug}`, "success").then(() => location.reload())
      })
   }

   return (
      <div className='z-20 fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center p-4'>
         <div className="bg-gray-50 rounded-lg border p-4 space-y-4 w-full max-w-lg">
            <h3 className='text-2xl font-bold'>
               {ar ? props.item.option.product.name_ar : props.item.option.product.name}
            </h3>
            <div className='text-yellow-500 text-2xl'>
               <div className='text-gray-800 text-xl'>{ar ? "تقييم" : "Rate"}</div>
               <button onClick={() => setrait(1)}>
                  <i className={`${rate >= 1 ? "fas" : "far"} fa-star`}></i>
               </button>
               <button onClick={() => setrait(2)}>
                  <i className={`${rate >= 2 ? "fas" : "far"} fa-star`}></i>
               </button>
               <button onClick={() => setrait(3)}>
                  <i className={`${rate >= 3 ? "fas" : "far"} fa-star`}></i>
               </button>
               <button onClick={() => setrait(4)}>
                  <i className={`${rate >= 4 ? "fas" : "far"} fa-star`}></i>
               </button>
               <button onClick={() => setrait(5)}>
                  <i className={`${rate == 5 ? "fas" : "far"} fa-star`}></i>
               </button>
            </div>
            <div>
               <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
                  {ar ? "ملاحاظاتك" : "Your notes"}
                  </label>
               <textarea
                  id="message"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={ar ? "ملاحاظاتك..." : "Your notes..."}
                  defaultValue={""} />
            </div>
            <button onClick={() => review()} className='py-2 px-4 bg-primary-100 rounded text-white'>submit</button>
         </div>
      </div>
   )
}

export default ReviewForm