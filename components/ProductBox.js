import Link from 'next/link'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { increment } from "../slices/cartSlice"
import { setAmount } from "../slices/wishlistIndicatorSlice"
// import { addToWishList, removeFromWishList } from "../slices/wishListSlice"
// import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'

const getNumberOfProductsInWishlist = () => {
   const storedWishlist = JSON.parse(localStorage.getItem("stored-wishlist")) || []
   return storedWishlist.length
}

const handleWishlistLocalStorage = (heartElement, itemSlug, changed) => {
   const storedWishlist = JSON.parse(localStorage.getItem("stored-wishlist")) || []
   if(storedWishlist.includes(itemSlug)){
      if(changed){
         storedWishlist.splice(storedWishlist.indexOf(itemSlug), 1)
         heartElement.current.classList.remove("fas")
         heartElement.current.classList.add("far")
      }else{
         heartElement.current.classList.add("fas")
         heartElement.current.classList.remove("far")
      }
   }else{
      if(changed){
         storedWishlist.push(itemSlug)
         heartElement.current.classList.remove("far")
         heartElement.current.classList.add("fas")
      }else{
         heartElement.current.classList.add("far")
         heartElement.current.classList.remove("fas")
      }
   }
   localStorage.setItem("stored-wishlist", JSON.stringify(storedWishlist))
}

const ProductBox = (props) => {
   const heartIcon = useRef()
   const dispatch = useDispatch()
   useEffect(()=>{
      handleWishlistLocalStorage(heartIcon, props.product.slug, false)
   }, [])
   // const wishList = useSelector((state) => state.wishList.value)
   // const [wished, setwished] = useState(false);
   const handleWishList = (item, isWish) => {
      // if (wishList.includes(item)) {
      //    dispatch(removeFromWishList(item))
      // } else {
      //    dispatch(addToWishList(item))
      // }
      const auth = false
      if(!auth){
         handleWishlistLocalStorage(heartIcon, item, true)
         dispatch(setAmount(getNumberOfProductsInWishlist()))
         return
      }
      console.log(isWish);
      if (isWish) {
         axios.post(`https://backends.donnachoice.com/api/products/${item}/remove_from_wishlist/`).then((res) => console.log(res.data))
      } else {
         axios.post(`https://backends.donnachoice.com/api/products/${item}/add_to_wishlist/`).then((res) => console.log(res.data))
      }
   }
   useEffect(() => {
      console.log(props.product);
   }, []);
   return (
      <div className="w-full relative border max-w-sm bg-gray-100 rounded-lg shadow-md">
         <div className="wish absolute top-[1rem] text-red-500 text-xl right-[1rem]">
            <button className='z-10' onClick={() => handleWishList(props.product.slug, props.product.is_wishlist)}>
               <i ref={heartIcon} className="far fa-heart"></i>
            </button>
         </div>
         <Link href={`/products/${props.product.slug}`}>
            <a>
               <img className="mb-4 rounded-t-lg" src={props.product.img ? props.product.img : "https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"} alt={`${props.product.name} img`} />
               <div className="px-5 pb-5">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                     {props.product.name}
                  </h5>
                  <div className="flex items-center mt-2.5 mb-5">
                     <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                     <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                     <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                     <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                     <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                     <span className="bg-blue-100 text-primary text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">5.0</span>
                  </div>
               </div>
            </a>
         </Link>
         <div className="flex flex-wrap justify-between items-center px-5 pb-5">
            <span className="text-3xl font-bold text-gray-900">${props.product.price}</span>
            <button
               className="text-white bg-primary hover:bg-primary/75 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
               onClick={() => dispatch(increment(props.product.slug))}
            >
               Add to cart
            </button>
         </div>
      </div>

   )
}

export default ProductBox