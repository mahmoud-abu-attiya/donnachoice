import Link from 'next/link'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setCartCount } from "../slices/cartIndicatorSlice"
import { useEffect } from 'react'
import Cookies from 'js-cookie'

const getNumberOfProductsInCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || []
    return storedCart.length
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
            addToCartButton.textContent = "add to cart"
        } else {
            addToCartButton.textContent = "remove from cart"
        }
    } else {
        if (changed) {
            storedCart.push({
                id: itemId,
                amount: 1
            })
            addToCartButton.textContent = "remove from cart"
        } else {
            addToCartButton.textContent = "add to cart"
        }
    }
    localStorage.setItem("stored-cart", JSON.stringify(storedCart))
}

export default function CartItem(props) {
    let storedCart, storedCartIds = []
    const auth = Cookies.get("auth")
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(props)
        storedCart = JSON.parse(localStorage.getItem("stored-cart")) || []
        storedCartIds = storedCart.map(cartId => cartId.id)
    }, [])

    const handleCart = (cartBtn, itemId) => {
        const auth = Cookies.get("auth")
        if (!auth) {
            handleCartLocalStorage(cartBtn, itemId, true)
            dispatch(setCartCount(getNumberOfProductsInCart()))
            return
        }
    }

    return (
        <div className="w-full relative border max-w-sm bg-gray-100 rounded-lg shadow-md">
            <Link href={`/products/${props.product.product.slug}`}>
                <a>
                <img className="mb-4 rounded-t-lg" src={props.product.product.img ? props.product.product.img : "https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"} alt={`${props.product.name} img`} />
                <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                        {props.product.product.name}
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
                <span>{props.product.name}</span>
                <span className="text-3xl font-bold text-gray-900">${props.product.price}</span>
                <div className='relative'>
                    <button
                        className="text-white bg-primary hover:bg-primary/75 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={(e) => handleCart(e.target, props.product.id)}
                    >
                        remove from cart
                    </button>
                </div>
            </div>
        </div>
    )
}
