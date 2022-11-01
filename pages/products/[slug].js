import React, { useEffect, useRef, useState } from 'react'
import ProductBox from '../../components/ProductBox';
import { useDispatch } from 'react-redux'
import { setAmount } from "../../slices/wishlistIndicatorSlice"
import { setCartCount } from "../../slices/cartIndicatorSlice"
import { setCompareCount } from "../../slices/compareIndicatorSlice"
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link';

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
			compareElement.current.classList.add("fa-random")
		} else {
			compareElement.current.classList.add("fa-check-circle")
			compareElement.current.classList.remove("fa-random")
		}
	} else {
		if (changed) {
			storedCompare.push(itemSlug)
			compareElement.current.classList.remove("fa-random")
			compareElement.current.classList.add("fa-check-circle")
		} else {
			compareElement.current.classList.add("fa-random")
			compareElement.current.classList.remove("fa-check-circle")
		}
	}
	localStorage.setItem("stored-compare", JSON.stringify(storedCompare))
}

const Product = ({ product }) => {
	let storedCart, storedCartIds = []
	const [tab, setTab] = useState(true);
	const [imgIndex, setImgIndex] = useState(0);
	const auth = Cookies.get("auth")
	const heartIcon = useRef()
	const compareIcon = useRef()
	const optionsMenu = useRef()
	const dispatch = useDispatch()
	useEffect(() => {
		storedCart = JSON.parse(localStorage.getItem("stored-cart")) || []
		storedCartIds = storedCart.map(cartId => cartId.id)
		if (!auth) {
			handleWishlistLocalStorage(heartIcon, product.slug, false)
			handleCompareLocalStorage(compareIcon, product.slug, false)
		}
	}, [])
	const [relatedPro, setRelatedPro] = useState([]);

	const handleWishList = (item, isWish) => {
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
		axios.get(`https://backends.donnachoice.com/api/products/?parents__slug=${product.slug}`)
			.then(res => setRelatedPro(res.data))
		console.log(product);
	}, [product])
	return (product &&
		<div className='container'>
			<nav className="flex" aria-label="Breadcrumb">
				<ol className="inline-flex items-center space-x-1 md:space-x-3">
					<li className="inline-flex items-center">
						<Link href="/">
							<a className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
								<svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
								Home
							</a>
						</Link>
					</li>
					<li>
						<div className="flex items-center">
									<svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
							<Link href="/products">
								<a>
									<span className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2">
										Products
									</span>
								</a>
							</Link>
						</div>
					</li>
					<li aria-current="page">
						<div className="flex items-center">
							<svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
							<span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
								{product && product.name}
							</span>
						</div>
					</li>
				</ol>
			</nav>
			<hr className="my-8 h-px bg-gray-200 border-0" />
			<div className="product grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="">
					<div className="flex items-center justify-center mb-8">
						<img className='max-w-full max-h-[300px] object-cover' src={product.images.length != 0 ? product.images[imgIndex].img : "https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"} alt="" />
					</div>
					{product.images.length != 0 && (
						<div className='flex justify-center items-center gap-8'>
							{product.images.map(image => {
								return (
									<button key={image.id} onClick={() => setImgIndex(product.images.indexOf(image))}>
										<img className='h-10' src={image.img} alt="broduct img" />
									</button>
								)
							})}
						</div>
					)}

				</div>
				{/* ///////////////////////////////////////////////// */}

				<div>
					<div className="mb-4 border-b border-primary-100">
						<ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
							<li className="mr-2">
								<button
									onClick={() => { tab == false && setTab(!tab) }}
									className={`inline-block p-4 rounded-t-lg border-b-0 ${tab == true && "border-2 bg-primary-300 text-primary-100 border-primary-100 "}`}>
									Description
								</button>
							</li>
							<li className="mr-2">
								<button
									onClick={() => { tab == true && setTab(!tab) }}
									className={`inline-block p-4 rounded-t-lg border-b-0 ${tab == false && "border-2 bg-primary-300 text-primary-100 border-primary-100 "}`}>
									Product Details
								</button>
							</li>
						</ul>
					</div>
					<div id="myTabContent">
						<div className={tab == false && "hidden"}>
							<div className="flex flex-col gap-4">
								<h2 className='text-2xl'>{product && product.name}</h2>
								<p className='text-gray-600'>{product.describtion ? product.describtion : "no descrioption"}</p>

								<span className='text-xl text-gray-700'>$ {product.options[0].price}</span>
							</div>
						</div>
						<div className={tab == true && "hidden"}>
							<div className="flex flex-col gap-2 mb-2">
								<p className='text-gray-600'><span className="font-light">brand:</span> {product.brand.name}</p>
								<p className='text-gray-600'><span className="font-light">category:</span> {product.category.name}</p>
								<p className='text-gray-600'><span className="font-light">product_code:</span> {product.product_code}</p>
								<p className='text-gray-600'><span className="font-light">SKU:</span> {product.sku}</p>
							</div>
						</div>
						<div className='flex gap-4'>
							<div className='relative'>
								<button
									className="text-white bg-primary-100 hover:bg-primary-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
									onClick={(e) => { product.options.length == 1 ? handleCart(e.target, product.options[0].id) : toggleOptionsMenu(product.slug) }}
								>
									Add to cart
								</button>
								{product.options.length > 0 ? <div ref={optionsMenu} className='absolute right-0 top-full w-48 p-3 bg-white shadow rounded z-10 hidden'>
									{product.options.map(option => {
										return (
											<div key={option.id} className='grid grid-cols-3 option'>
												<span>{option.name}</span>
												<span>{option.price}$</span>
												<button data-slug={product.slug} onClick={(e) => handleCart(e.target, option.id)}>
													{storedCartIds.includes(option.id) ? "remove" : "add"}
												</button>
											</div>
										)
									})}
								</div> : null}
							</div>
							<button className='z-10 text-xl border rounded px-4 bg-gray-100 hover:shadow transition hover:scale-105 text-red-600' title='Add product to wishlist' onClick={() => handleWishList(product.slug, product.is_wishlist)}>
								<i ref={heartIcon} className="far fa-heart"></i>
							</button>
							<button className='z-10 text-xl border rounded px-4 bg-gray-100 hover:shadow transition hover:scale-105 text-blue-600' title='Add product to comper list' onClick={() => handleCompare(product.slug)}>
								<i ref={compareIcon} className="fas fa-random"></i>
							</button>
						</div>
					</div>
				</div>


				{/* ///////////////////////////////////////////////// */}

			</div>
			<hr className="my-8 h-px bg-gray-200 border-0" />
			<div className="mb-8">
				<h2 className='font-bold text-3xl mb-8'>Related Products</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{relatedPro.map(pro => <ProductBox key={pro.id} product={pro} />)}
				</div>
			</div>
		</div>
	)
}

export default Product;

export const getStaticProps = async ({ params }) => {
	const { data } = await axios.get(`https://backends.donnachoice.com/api/products/${params.slug}`);
	const product = data;
	return {
		props: {
			product,
		},
	};
};

export const getStaticPaths = async () => {
	const { data } = await axios.get("https://backends.donnachoice.com/api/products/");
	const paths = data.map((products) => ({ params: { slug: products.slug.toString() } }));
	return {
		paths,
		fallback: true,
	};
};