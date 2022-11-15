/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { increment } from "../slices/cartSlice";
import { setAmount } from "../slices/wishlistIndicatorSlice";
import { setCartCount } from "../slices/cartIndicatorSlice";
import { setCompareCount } from "../slices/compareIndicatorSlice";
// import { addToWishList, removeFromWishList } from "../slices/wishListSlice"
import { useSelector } from 'react-redux'
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const getNumberOfProductsInWishlist = () => {
   const storedWishlist =
      JSON.parse(localStorage.getItem("stored-wishlist")) || [];
   return storedWishlist.length;
};

const getNumberOfProductsInCart = () => {
   const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || [];
   return storedCart.length;
};

const getNumberOfProductsInCompare = () => {
   const storedCompare =
      JSON.parse(localStorage.getItem("stored-compare")) || [];
   return storedCompare.length;
};

const handleWishlistLocalStorage = (heartElement, itemSlug, changed) => {
   const storedWishlist =
      JSON.parse(localStorage.getItem("stored-wishlist")) || [];
   if (storedWishlist.includes(itemSlug)) {
      if (changed) {
         storedWishlist.splice(storedWishlist.indexOf(itemSlug), 1);
         heartElement.current.classList.remove("fas");
         heartElement.current.classList.add("far");
      } else {
         heartElement.current.classList.add("fas");
         heartElement.current.classList.remove("far");
      }
   } else {
      if (changed) {
         storedWishlist.push(itemSlug);
         heartElement.current.classList.remove("far");
         heartElement.current.classList.add("fas");
      } else {
         heartElement.current.classList.add("far");
         heartElement.current.classList.remove("fas");
      }
   }
   localStorage.setItem("stored-wishlist", JSON.stringify(storedWishlist));
};

const handleCartLocalStorage = (addToCartButton, itemId, changed) => {
   const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || [];
   const storedCartIds = storedCart.map((cartId) => cartId.id);
   if (storedCartIds.includes(itemId)) {
      if (changed) {
         console.log(storedCart);
         console.log(itemId);
         for (let i = 0; i < storedCart.length; i++) {
            console.log("LOOP");
            if (storedCart[i].id === itemId) {
               console.log("IF", storedCart[i].id, itemId, i);
               storedCart.splice(i, 1);
               break;
            }
         }
         addToCartButton.textContent = "Add";
      } else {
         addToCartButton.textContent = "Remove";
      }
   } else {
      if (changed) {
         storedCart.push({
            id: itemId,
            amount: 1,
         });
         addToCartButton.textContent = "Remove";
      } else {
         addToCartButton.textContent = "Add";
      }
   }
   localStorage.setItem("stored-cart", JSON.stringify(storedCart));
};

const handleCompareLocalStorage = (compareElement, itemSlug, changed) => {
   const storedCompare =
      JSON.parse(localStorage.getItem("stored-compare")) || [];
   if (storedCompare.includes(itemSlug)) {
      if (changed) {
         storedCompare.splice(storedCompare.indexOf(itemSlug), 1);
         compareElement.current.classList.remove("fa-check-circle");
         compareElement.current.classList.add("fa-random");
      } else {
         compareElement.current.classList.add("fa-check-circle");
         compareElement.current.classList.remove("fa-random");
      }
   } else {
      if (changed) {
         storedCompare.push(itemSlug);
         compareElement.current.classList.remove("fa-random");
         compareElement.current.classList.add("fa-check-circle");
      } else {
         compareElement.current.classList.add("fa-random");
         compareElement.current.classList.remove("fa-check-circle");
      }
   }
   localStorage.setItem("stored-compare", JSON.stringify(storedCompare));
};

const ProductBox = (props) => {
   const ar = useSelector(state => state.langs.value)
   const [storedCartIds, setStoredCartIds] = useState([]);
   const [authState, setAuthState] = useState(false);
   let storedCart = [];
   let auth;
   const heartIcon = useRef();
   const compareIcon = useRef();
   const optionsMenu = useRef();
   const dispatch = useDispatch();
   useEffect(() => {
      storedCart = JSON.parse(localStorage.getItem("stored-cart")) || [];
      const tempStoredCartIds = storedCart.map((cartId) => cartId.id);
      // console.log(tempStoredCartIds)
      auth = Cookies.get("auth");
      // console.log(auth)
      if (auth) {
         setAuthState(true);
      } else {
         handleWishlistLocalStorage(heartIcon, props.product.slug, false);
      }
      handleCompareLocalStorage(compareIcon, props.product.slug, false);
      setStoredCartIds(tempStoredCartIds);
   }, []);
   // const wishList = useSelector((state) => state.wishList.value)
   // const [wished, setwished] = useState(false);
   const handleWishList = (item, isWish) => {
      // if (wishList.includes(item)) {
      //    dispatch(removeFromWishList(item))
      // } else {
      //    dispatch(addToWishList(item))
      // }
      console.log(authState);
      if (!authState) {
         handleWishlistLocalStorage(heartIcon, item, true);
         dispatch(setAmount(getNumberOfProductsInWishlist()));
         return;
      }
      isWish = heartIcon.current.classList.contains("fas");
      // console.log(isWish);
      if (isWish) {
         axios
            .post(
               `https://backends.donnachoice.com/api/products/remove_from_wishlist/`,
               {
                  products: [item],
               },
               {
                  headers: {
                     Authorization: `Bearer ${Cookies.get("token")}`,
                  },
               }
            )
            .then((res) => {
               console.log(res.data);
               heartIcon.current.classList.remove("fas");
               heartIcon.current.classList.add("far");
               axios
                  .get(`https://backends.donnachoice.com/api/counts`, {
                     headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                     },
                  })
                  .then((res) => {
                     dispatch(setAmount(res.data.wishlist));
                  });
            });
      } else {
         axios
            .post(
               `https://backends.donnachoice.com/api/products/update_wishlist/`,
               {
                  products: [item],
               },
               {
                  headers: {
                     Authorization: `Bearer ${Cookies.get("token")}`,
                  },
               }
            )
            .then((res) => {
               console.log(res.data);
               heartIcon.current.classList.add("fas");
               heartIcon.current.classList.remove("far");
               axios
                  .get(`https://backends.donnachoice.com/api/counts`, {
                     headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                     },
                  })
                  .then((res) => {
                     dispatch(setAmount(res.data.wishlist));
                  });
            });
      }
   };

   const handleCart = (cartBtn, itemId) => {
      const auth = Cookies.get("auth");
      if (auth) {
         if (cartBtn.textContent == "Add") {
            axios
               .post(
                  `https://backends.donnachoice.com/api/products/cart/`,
                  [
                     {
                        option: itemId,
                        quantity: 1,
                     },
                  ],
                  {
                     headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                     },
                  }
               )
               .then((res) => {
                  cartBtn.textContent = "Remove";
                  axios
                     .get(`https://backends.donnachoice.com/api/counts`, {
                        headers: {
                           Authorization: `Bearer ${Cookies.get("token")}`,
                        },
                     })
                     .then((res) => {
                        dispatch(setCartCount(res.data.cart));
                     });
               });
         } else {
            axios
               .post(
                  `https://backends.donnachoice.com/api/products/remove_from_cart/`,
                  {
                     options: [itemId],
                  },
                  {
                     headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                     },
                  }
               )
               .then((res) => {
                  cartBtn.textContent = "Add";
                  axios
                     .get(`https://backends.donnachoice.com/api/counts`, {
                        headers: {
                           Authorization: `Bearer ${Cookies.get("token")}`,
                        },
                     })
                     .then((res) => {
                        dispatch(setCartCount(res.data.cart));
                     });
               });
         }
      } else {
         handleCartLocalStorage(cartBtn, itemId, true);
         dispatch(setCartCount(getNumberOfProductsInCart()));
      }
      if (cartBtn.parentElement) {
         toggleOptionsMenu()
      }
   };

   const toggleOptionsMenu = () => {
      if (optionsMenu.current) {
         if (optionsMenu.current.classList.contains("hidden")) {
            optionsMenu.current.classList.remove("hidden");
         } else {
            optionsMenu.current.classList.add("hidden");
         }
      }
   };

   const handleCompare = (item) => {
      handleCompareLocalStorage(compareIcon, item, true);
      dispatch(setCompareCount(getNumberOfProductsInCompare()));
   };

   const addedOne = (element, productId) => {
      // element.textContent = "Done";
      if (element.textContent == "Add to cart" || element.textContent == "أضف إلى العربة") {
         element.textContent = ar ? "ازالة" : "Remove"
      } else {
         element.textContent = ar ? "أضف إلى العربة" : "Add to cart"
      }
   }

   return (
      <div className="w-full relative border bg-gray-50 rounded-lg shadow-md">
         <div className="wish z-10 absolute top-[1rem] text-red-500 text-xl right-[1rem]">
            {authState ? (
               <button
                  className="z-10"
                  onClick={() =>
                     handleWishList(props.product.slug, props.product.is_wishlist)
                  }
                  title="Add to wishlist"
               >
                  {props.product.is_wishlist ? (
                     <i ref={heartIcon} className="fas fa-heart"></i>
                  ) : (
                     <i ref={heartIcon} className="far fa-heart"></i>
                  )}
               </button>
            ) : (
               <button
                  className="z-10"
                  onClick={() =>
                     handleWishList(props.product.slug, props.product.is_wishlist)
                  }
                  title="Add to wishlist"
               >
                  <i ref={heartIcon} className="far fa-heart"></i>
               </button>
            )}
         </div>
         <div className="wish z-10 absolute top-[1rem] text-blue-500 text-xl left-[1rem]">
            <button
               className=""
               onClick={() => handleCompare(props.product.slug)}
               title="Add to compare list"
            >
               <i ref={compareIcon} className="fas fa-random"></i>
            </button>
         </div>
         <Link href={`/products/${props.product.slug}`}>
            <a>
               <div className="w-full mb-4 img-container">
                  <img
                     className="w-full rounded-t-lg square object-contain"
                     src={
                        props.product.images != 0
                           ? props.product.images[0].img
                           : "https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
                     }
                     alt={`${props.product.name} img`}
                  />
               </div>
               <div className="px-2 sm:px-5 sm:pb-5">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                     {ar ? props.product.name_ar : props.product.name}
                  </h5>
                  <div className="flex items-center my-2.5">
                     <i className={`${props.product.rate >= 1 ? "fas" : "far"} fa-star text-yellow-500`}></i>
                     <i className={`${props.product.rate >= 2 ? "fas" : "far"} fa-star text-yellow-500`}></i>
                     <i className={`${props.product.rate >= 3 ? "fas" : "far"} fa-star text-yellow-500`}></i>
                     <i className={`${props.product.rate >= 4 ? "fas" : "far"} fa-star text-yellow-500`}></i>
                     <i className={`${props.product.rate >= 5 ? "fas" : "far"} fa-star text-yellow-500`}></i>
                     <span className="bg-blue-100 text-blue-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
                        {props.product.rate ? `${props.product.rate}.0` : 0}
                     </span>
                  </div>
               </div>
            </a>
         </Link>
         <div className="space-y-4 px-2 sm:px-5 pb-2 sm:pb-5">
            <span className="text-xl sm:text-2xl mb-4 sm:mb-0 font-bold text-gray-900">
               <span className="text-sm">{ar ? "ريال" : "QR"}</span>{props.product.options[0]?.price}
            </span>
            <div className="relative w-full sm:w-fit">
               <button
                  className="text-white w-full bg-primary-100 hover:bg-primary-200 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center"
                  onClick={props.product.options.length > 1 ? () => toggleOptionsMenu(props.product.slug) : (e) => { handleCart({ textContent: "Add" }, props.product.options[0].id); addedOne(e.target, props.product.options[0].id) }}
               >
                  {ar ? "أضف إلى العربة" : "Add to cart"}
               </button>
               {props.product.options.length > 0 ? (
                  <div
                     onMouseLeave={() => toggleOptionsMenu()}
                     ref={optionsMenu}
                     className="absolute right-1/2 translate-x-1/2 top-full space-y-2 w-48 p-3 bg-white shadow rounded z-20 hidden"
                  >
                     {props.product.options.map((option) => {
                        return (
                           <div key={option.id} className="text-xs items-center grid grid-cols-3 option">
                              <span>{option.name}</span>
                              <span>{option.price}QR</span>
                              {authState ? (
                                 <button
                                    className="bg-primary-100 text-white rounded p-2"
                                    data-slug={props.product.slug}
                                    onClick={(e) => handleCart(e.target, option.id)}
                                 >
                                    {option.is_added_to_cart ? "Remove" : "Add"}
                                 </button>
                              ) : (
                                 <button
                                    className="bg-primary-100 text-white rounded p-2"
                                    data-slug={props.product.slug}
                                    onClick={(e) => handleCart(e.target, option.id)}
                                 >
                                    {storedCartIds.includes(option.id) ? "Remove" : "Add"}
                                 </button>
                              )}
                           </div>
                        );
                     })}
                  </div>
               ) : null}
            </div>
         </div>
      </div>
   );
};

export default ProductBox;
