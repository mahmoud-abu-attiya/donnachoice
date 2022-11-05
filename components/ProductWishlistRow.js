import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Link from "next/link";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setCartCount } from "../slices/cartIndicatorSlice";
import { setAmount } from "../slices/wishlistIndicatorSlice";
import axios from 'axios';

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

const getNumberOfProductsInCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || [];
    return storedCart.length;
};

export default function ProductWishlistRow({ product }) {
    const ar = useSelector((state) => state.langs.value);
    const optionsMenu = useRef();
    const [authState, setAuthState] = useState(false);
    const [storedCartIds, setStoredCartIds] = useState([]);
    let storedCart = []
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = Cookies.get("auth")
        if (auth == "true") {
            setAuthState(true);
        }
        storedCart = JSON.parse(localStorage.getItem("stored-cart")) || [];
        const tempStoredCartIds = storedCart.map((cartId) => cartId.id);
        setStoredCartIds(tempStoredCartIds);
    }, []);

    const toggleOptionsMenu = () => {
        if (optionsMenu.current) {
            if (optionsMenu.current.classList.contains("hidden")) {
                optionsMenu.current.classList.remove("hidden");
            } else {
                optionsMenu.current.classList.add("hidden");
            }
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

    const addedOne = (element, productId) => {
        // element.textContent = "Done";
        if (element.textContent == "Add to cart" || element.textContent == "أضف إلى العربة") {
            element.textContent = ar ? "ازالة" : "Remove"
        } else {
            element.textContent = ar ? "أضف إلى العربة" : "Add to cart"
        }
    }

    const removeFromWishlist = (e, item) => {
        // if (wishList.includes(item)) {
        //    dispatch(removeFromWishList(item))
        // } else {
        //    dispatch(addToWishList(item))
        // }
        console.log(authState);
        if (!authState) {
            handleWishlistLocalStorage(e, item);
            dispatch(setAmount(getNumberOfProductsInWishlist()));
            return;
        }
        // console.log(isWish);
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
                e.target.closest(".product-row").style.display = "none"
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
    };

    const getNumberOfProductsInWishlist = () => {
        const storedWishlist =
            JSON.parse(localStorage.getItem("stored-wishlist")) || [];
        return storedWishlist.length;
    };

    const handleWishlistLocalStorage = (e, itemSlug) => {
        const storedWishlist = JSON.parse(localStorage.getItem("stored-wishlist")) || [];
        if (storedWishlist.includes(itemSlug)) {
            storedWishlist.splice(storedWishlist.indexOf(itemSlug), 1);
            e.target.closest(".product-row").style.display = "none"
        }
        localStorage.setItem("stored-wishlist", JSON.stringify(storedWishlist));
    };

    return (
        <tr key={product.id} className="bg-white border-b product-row">
            <td className="p-4 md:w-32">
                <img src={product.images.length > 0 ? product.images[0].img : "https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"} alt="Apple Watch" />
            </td>
            <td className="py-4 px-6 font-semibold text-gray-900">
                {ar ? product.name_ar : product.name}
            </td>
            <td className="py-4 px-6">
                <p className='text-primary-100 bg-primary-300 rounded-full px-4 w-fit whitespace-nowrap'>{product.available ? "in stock" : "out stock"}</p>
            </td>
            <td className="py-4 px-6 font-semibold text-gray-900">
                {ar ? "ريال" : "QR"} 599
            </td>
            <td className="py-4 px-6 flex flex-col gap-2 items-center justify-center">
                <button onClick={(e) => removeFromWishlist(e, product.slug)} className="font-medium w-full max-w-[6rem] bg-red-600 text-white py-1 px-2 rounded">
                    {ar ? "ازالة" : "Remove"}
                </button>
                {/* <button className="font-medium w-full max-w-[6rem] bg-primary-100 text-white py-1 px-2 rounded">
                {ar ? "اضف" : "Add"}
                </button> */}
                <div className="relative w-full max-w-[6rem]">
                    {product.options.length > 1 ? 
                    <button
                        className="font-medium w-full max-w-[6rem] bg-primary-100 text-white py-1 px-2 rounded"
                        onClick={() => toggleOptionsMenu(product.slug)}
                    >
                        {ar ? "أضف إلى العربة" : "Add to cart"}
                    </button> : <>
                        {authState ? (
                            <button
                                className="text-white w-full bg-primary-100 hover:bg-primary-200 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center"
                                onClick={(e) => { handleCart({ textContent: "Add" }, product.options[0].id); addedOne(e.target, product.options[0].id) }}
                            >
                                {product.options[0].is_added_to_cart ? <>{ar ? "أحذف من العربة" : "Remove from cart"}</> : <>{ar ? "أضف إلى العربة" : "Add to cart"}</>}
                            </button>
                        ) : (
                            <button
                                className="text-white w-full bg-primary-100 hover:bg-primary-200 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center"
                                onClick={(e) => { handleCart({ textContent: "Add" }, product.options[0].id); addedOne(e.target, product.options[0].id) }}
                            >
                                {storedCartIds.includes(product.options[0].id) ? <>{ar ? "أحذف" : "Remove"}</> : <>{ar ? "أضف إلى العربة" : "Add to cart"}</>}
                            </button>
                        )}
                    </>}
                    {product.options.length > 0 ? (
                        <div
                            onMouseLeave={() => toggleOptionsMenu()}
                            ref={optionsMenu}
                            className="absolute right-1/2 translate-x-1/2 top-full space-y-2 w-48 p-3 bg-white shadow rounded z-20 hidden"
                        >
                            {product.options.map((option) => {
                                return (
                                    <div key={option.id} className="text-xs items-center grid grid-cols-3 option">
                                        <span>{option.name}</span>
                                        <span>{option.price}QR</span>
                                        {authState ? (
                                            <button
                                                className="bg-primary-100 text-white rounded p-2"
                                                data-slug={product.slug}
                                                onClick={(e) => handleCart(e.target, option.id)}
                                            >
                                                {option.is_added_to_cart ? "Remove" : "Add"}
                                            </button>
                                        ) : (
                                            <button
                                                className="bg-primary-100 text-white rounded p-2"
                                                data-slug={product.slug}
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
                <Link href={`/products/${product.slug}`}>
                    <a className="text-center font-medium w-full max-w-[6rem] bg-gray-600 text-white py-1 px-2 rounded">
                        {ar ? "تفاصيل" : "Details"}
                    </a>
                </Link>
            </td>
        </tr>
    )
}
