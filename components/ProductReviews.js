import React from 'react'
import { useEffect } from 'react';

const ProductReviews = (props) => {
   useEffect(() => {
      console.log(props.reviews);
   }, []);
   return (
      <div className="reviews flex flex-col gap-4 text-sm bg-gray-50 border rounded-md p-4 max-h-64 overflow-y-auto">
         {props.reviews.length == 0 ? <div>There is no reviews yet.</div> :
            props.reviews.map((rev, index) => {
               return (
                  <div key={index}>
                  <div className="flex gap-2 items-center">
                     <i className="fad fa-user"></i>
                     <p className="font-bold capitalize">{rev.first_name + " " + rev.last_name}</p>
                  </div>
                     <div className="start">
                        <i className={`${rev.rate >= 1 ? "fas" : "far"} fa-star text-yellow-500`}></i>
                        <i className={`${rev.rate >= 2 ? "fas" : "far"} fa-star text-yellow-500`}></i>
                        <i className={`${rev.rate >= 3 ? "fas" : "far"} fa-star text-yellow-500`}></i>
                        <i className={`${rev.rate >= 4 ? "fas" : "far"} fa-star text-yellow-500`}></i>
                        <i className={`${rev.rate >= 5 ? "fas" : "far"} fa-star text-yellow-500`}></i>
                     </div>
                     <p className='text-light text-gray-600'>{rev.comment}</p>
                  </div>
               )
            })
         }
      </div>
   )
}

export default ProductReviews