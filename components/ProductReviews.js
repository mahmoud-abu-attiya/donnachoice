import React from 'react'

const ProductReviews = (props) => {
   return (
      <div className="reviews flex flex-col gap-4 text-sm bg-gray-50 border rounded-md p-4 max-h-64 overflow-y-auto">
         {props.reviews.length == 0 ? <div>There is no reviews yet.</div> :
            props.reviews.map((rev, index) => {
               return (
                  <div key={index}>
                     <p className="font-bold capitalize">name</p>
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