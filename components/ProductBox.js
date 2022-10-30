import Link from 'next/link'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { increment } from "../slices/cartSlice"
import { setAmount } from "../slices/wishlistIndicatorSlice"
import { setCartCount } from "../slices/cartIndicatorSlice"
import { setCompareCount } from "../slices/compareIndicatorSlice"
// import { addToWishList, removeFromWishList } from "../slices/wishListSlice"
// import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const getNumberOfProductsInWishlist = () => {
   const storedWishlist = JSON.parse(localStorage.getItem("stored-wishlist")) || []
   return storedWishlist.length
}

const getNumberOfProductsInCart = () => {
   const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || []
   return storedCart.length
}

const getNumberOfProductsInCompare = () => {
   const storedCompare = JSON.parse(localStorage.getItem("stored-compare")) || []
   return storedCompare.length
}

const handleWishlistLocalStorage = (heartElement, itemSlug, changed) => {
   const storedWishlist = JSON.parse(localStorage.getItem("stored-wishlist")) || []
   if (storedWishlist.includes(itemSlug)) {
      if (changed) {
         storedWishlist.splice(storedWishlist.indexOf(itemSlug), 1)
         heartElement.current.classList.remove("fas")
         heartElement.current.classList.add("far")
      } else {
         heartElement.current.classList.add("fas")
         heartElement.current.classList.remove("far")
      }
   } else {
      if (changed) {
         storedWishlist.push(itemSlug)
         heartElement.current.classList.remove("far")
         heartElement.current.classList.add("fas")
      } else {
         heartElement.current.classList.add("far")
         heartElement.current.classList.remove("fas")
      }
   }
   localStorage.setItem("stored-wishlist", JSON.stringify(storedWishlist))
}

const handleCartLocalStorage = (addToCartButton, itemId, changed) => {
   const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || []
   const storedCartIds = storedCart.map(cartId => cartId.id)
   if (storedCartIds.includes(itemId)) {
      if (changed) {
         console.log(storedCart)
         console.log(itemId)
         for (let i = 0; i < storedCart.length; i++) {
            console.log("LOOP")
            if (storedCart[i].id === itemId) {
               console.log("IF", storedCart[i].id, itemId, i)
               storedCart.splice(i, 1)
               break
            }
         }
         addToCartButton.textContent = "add"
      } else {
         addToCartButton.textContent = "remove"
      }
   } else {
      if (changed) {
         storedCart.push({
            id: itemId,
            amount: 1
         })
         addToCartButton.textContent = "remove"
      } else {
         addToCartButton.textContent = "add"
      }
   }
   localStorage.setItem("stored-cart", JSON.stringify(storedCart))
}

const handleCompareLocalStorage = (compareElement, itemSlug, changed) => {
   const storedCompare = JSON.parse(localStorage.getItem("stored-compare")) || []
   if (storedCompare.includes(itemSlug)) {
      if (changed) {
         storedCompare.splice(storedCompare.indexOf(itemSlug), 1)
         compareElement.current.classList.remove("fa-check-circle")
         compareElement.current.classList.add("fa-balance-scale")
      } else {
         compareElement.current.classList.add("fa-check-circle")
         compareElement.current.classList.remove("fa-balance-scale")
      }
   } else {
      if (changed) {
         storedCompare.push(itemSlug)
         compareElement.current.classList.remove("fa-balance-scale")
         compareElement.current.classList.add("fa-check-circle")
      } else {
         compareElement.current.classList.add("fa-balance-scale")
         compareElement.current.classList.remove("fa-check-circle")
      }
   }
   localStorage.setItem("stored-compare", JSON.stringify(storedCompare))
}

const ProductBox = (props) => {
   let storedCart, storedCartIds = []
   const auth = Cookies.get("auth")
   const heartIcon = useRef()
   const compareIcon = useRef()
   const optionsMenu = useRef()
   const dispatch = useDispatch()
   useEffect(() => {
      storedCart = JSON.parse(localStorage.getItem("stored-cart")) || []
      storedCartIds = storedCart.map(cartId => cartId.id)
      if (!auth) {
         handleWishlistLocalStorage(heartIcon, props.product.slug, false)
         handleCompareLocalStorage(compareIcon, props.product.slug, false)
      }
   }, [])
   // const wishList = useSelector((state) => state.wishList.value)
   // const [wished, setwished] = useState(false);
   const handleWishList = (item, isWish) => {
      // if (wishList.includes(item)) {
      //    dispatch(removeFromWishList(item))
      // } else {
      //    dispatch(addToWishList(item))
      // }
      if (!auth) {
         handleWishlistLocalStorage(heartIcon, item, true)
         dispatch(setAmount(getNumberOfProductsInWishlist()))
         return
      }
      isWish = heartIcon.current.classList.contains("fas")
      console.log(isWish);
      if (isWish) {
         axios.post(`https://backends.donnachoice.com/api/products/remove_from_wishlist/`, {
            products: [
               item
            ]
         }, {
            headers: {
               Authorization: `Bearer ${Cookies.get("token")}`,
            },
         })
            .then((res) => {
               console.log(res.data)
               heartIcon.current.classList.remove("fas")
               heartIcon.current.classList.add("far")
               axios.get(`https://backends.donnachoice.com/api/counts`, {
                  headers: {
                     Authorization: `Bearer ${Cookies.get("token")}`,
                  },
               })
                  .then(res => {
                     dispatch(setAmount(res.data.wishlist))
                  })
            })
      } else {
         axios.post(`https://backends.donnachoice.com/api/products/update_wishlist/`, {
            products: [
               item
            ]
         }, {
            headers: {
               Authorization: `Bearer ${Cookies.get("token")}`,
            },
         })
            .then((res) => {
               console.log(res.data)
               heartIcon.current.classList.add("fas")
               heartIcon.current.classList.remove("far")
               axios.get(`https://backends.donnachoice.com/api/counts`, {
                  headers: {
                     Authorization: `Bearer ${Cookies.get("token")}`,
                  },
               })
                  .then(res => {
                     dispatch(setAmount(res.data.wishlist))
                  })
            })
      }
   }

   const handleCart = (cartBtn, itemId) => {
      const auth = Cookies.get("auth")
      if (!auth) {
         handleCartLocalStorage(cartBtn, itemId, true)
         dispatch(setCartCount(getNumberOfProductsInCart()))
         return
      }
   }

   const toggleOptionsMenu = () => {
      if (optionsMenu.current) {
         if (optionsMenu.current.classList.contains("hidden")) {
            optionsMenu.current.classList.remove("hidden")
         } else {
            optionsMenu.current.classList.add("hidden")
         }
      }
   }

   const handleCompare = (item) => {
      handleCompareLocalStorage(compareIcon, item, true)
      dispatch(setCompareCount(getNumberOfProductsInCompare()))
   }

   useEffect(() => {
      console.log(props.product);
   }, []);

   return (
      <div className="w-full relative border bg-gray-100 rounded-lg shadow-md">
         <div className="wish absolute top-[1rem] text-red-500 text-xl right-[1rem]">
            <button className='z-10' onClick={() => handleWishList(props.product.slug, props.product.is_wishlist)}>
               {props.product.is_wishlist ? <i ref={heartIcon} className="fas fa-heart"></i> : <i ref={heartIcon} className="far fa-heart"></i>}
            </button>
         </div>
         <div className="wish absolute top-[1rem] text-blue-500 text-xl left-[1rem]">
            <button className='z-10' onClick={() => handleCompare(props.product.slug)}>
               <i ref={compareIcon} class="fas fa-balance-scale"></i>
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
                     <span className="bg-blue-100 text-primary-200 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">5.0</span>
                  </div>
               </div>
            </a>
         </Link>
         <div className="flex flex-wrap justify-between items-center px-5 pb-5">
            <span className="text-3xl font-bold text-gray-900">${props.product.options[0].price}</span>
            <div className='relative'>
               <button
                  className="text-white bg-primary-200 hover:bg-primary-300 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => toggleOptionsMenu(props.product.slug)}
               >
                  Add to cart
               </button>
               {props.product.options.length > 0 ? <div ref={optionsMenu} className='absolute right-0 top-full w-48 p-3 bg-white shadow rounded z-10 hidden'>
                  {props.product.options.map(option => {
                     return (<div key={option.id} className='grid grid-cols-3 option'>
                        <span>{option.name}</span>
                        <span>{option.price}$</span>
                        <button data-slug={props.product.slug} onClick={(e) => handleCart(e.target, option.id)}>
                           {storedCartIds.includes(option.id) ? "remove" : "add"}
                        </button>
                     </div>)
                  })}
               </div> : null}
            </div>
         </div>
      </div>
   )
}

export default ProductBox