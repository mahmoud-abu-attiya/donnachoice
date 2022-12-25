/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import ProductBox from "../../components/ProductBox";
import { useDispatch, useSelector } from "react-redux";
import { setAmount } from "../../slices/wishlistIndicatorSlice";
import { setCartCount } from "../../slices/cartIndicatorSlice";
import { setCompareCount } from "../../slices/compareIndicatorSlice";
import { APICart } from "../../components/cart/api";
import { LocalStorageCart } from "../../components/cart/localstorage";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import ProductSwiper from "../../components/ProductSwiper";
import ProductReviews from "../../components/ProductReviews";
import Head from "next/head";

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

export const getStaticPaths = async () => {
	const { data } = await axios.get(
		"https://backends.donnachoice.com/api/products/"
	);
	const paths = data.map((products) => ({
		params: { slug: products.slug.toString() },
	}));
	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps = async ({ params }) => {
	const { data } = await axios.get(
		`https://backends.donnachoice.com/api/products/${params.slug}`
	);
	const product = data;
	return {
		props: {
			product,
		},
	};
};

const Product = ({ product }) => {
	const [proCount, setproCount] = useState(1);
	const ar = useSelector((state) => state.langs.value);
	let storedCart,
		storedCartIds = [];
	const [tab, setTab] = useState(1);
	const [imgIndex, setImgIndex] = useState(0);
	const [reviews, setReviews] = useState([]);
	const auth = Cookies.get("auth");
	const heartIcon = useRef();
	const compareIcon = useRef();
	const [selectedOption, setselectedOption] = useState(
		product?.options[0]?.id
	);
	const dispatch = useDispatch();
	let cart;
	if (auth) {
		cart = new APICart(Cookies.get("token"));
	} else {
		cart = new LocalStorageCart();
	}

	const optionQ = product?.options.find(
		(option) => option.id == selectedOption
	)?.quantity;
	useEffect(() => {
		// console.log(product);
		cart.load();
		storedCart = cart.storedCart;
		storedCartIds = cart.storedCartIds;
		if (!auth) {
			handleWishlistLocalStorage(heartIcon, product.slug, false);
			handleCompareLocalStorage(compareIcon, product.slug, false);
		}
	}, []);
	const [relatedPro, setRelatedPro] = useState([]);

	const handleWishList = (item, isWish) => {
		if (!auth) {
			handleWishlistLocalStorage(heartIcon, item, true);
			dispatch(setAmount(getNumberOfProductsInWishlist()));
			return;
		}
		isWish = heartIcon.current.classList.contains("fas");
		console.log(isWish);
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

	const handleCompare = (item) => {
		handleCompareLocalStorage(compareIcon, item, true);
		dispatch(setCompareCount(getNumberOfProductsInCompare()));
	};

	const share = () => {
		if (navigator.share) {
			navigator
				.share({
					title: product.name,
					url: window.location.href,
				})
				.then(() => console.log("Successful share"))
				.catch((error) => console.log("Error sharing", error));
		} else {
			alert("Share not supported");
		}
	};

	const addSelectedOptionToCart = (btn, quantity = 1) => {
		cart.load();
		cart.add(selectedOption, quantity);
		cart.save();
		cart.setCartCount(setCartCount, dispatch);
		if (btn.classList.contains("atbtn")) {
			btn.querySelector(".done").classList.remove("hidden");
			btn.querySelector(".done").classList.add("grid");
			setTimeout(() => {
				btn.querySelector(".done").classList.remove("grid");
				btn.querySelector(".done").classList.add("hidden");
			}, 1000);
		}
	};

	useEffect(() => {
		axios
			.get(
				`https://backends.donnachoice.com/api/products/?parents__slug=${product.slug}`
			)
			.then((res) => setRelatedPro(res.data));
		// console.log(product);
		axios
			.get(
				`https://backends.donnachoice.com/api/products/${product.slug}/rate/`
			)
			.then((res) => setReviews(res.data));
	}, [product]);

	const selectOption = (e, optionId) => {
		setselectedOption(optionId);
		let currentOption = document.querySelector(".active-option");
		if (currentOption) {
			currentOption.classList.remove("active-option", "border-primary-100");
		}
		e.target.classList.add("active-option", "border-primary-100");
	};

	return (
		<>
			<Head>
				<title>{product?.name}</title>
				<meta name="description" content={product?.describtion} />
				<meta name="keywords" content={relatedPro.map(pro => pro.name)} />
				<meta name="author" content="DonnaChoice" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta property="og:title" content={product?.name} />
				<meta property="og:description" content={product?.describtion} />
				<meta property="og:image" content={product?.images[0].img} />
				<meta property="og:url" content={product?.slug} />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="DonnaChoice" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={product?.name} />
				<meta name="twitter:description" content={product?.describtion} />
				<meta name="twitter:image" content={product?.images[0].img} />
				{/* <meta name="twitter:site" content="@DonnaChoice" />
				<meta name="twitter:creator" content="@DonnaChoice" /> */}
			</Head>
		{product && (
			<div dir={ar ? "rtl" : "ltr"}>
				<div className="container mt-8">
					<nav
						className="flex bg-gray-50 py-3 px-5 rounded mb-8 "
						aria-label="Breadcrumb"
					>
						<ol className="inline-flex items-center">
							<li className="inline-flex items-center">
								<Link href="/">
									<a className="inline-flex gap-2 items-center text-sm font-medium text-gray-700 hover:text-gray-900">
										<svg
											className="w-4 h-4 mr-2"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
										</svg>
										{ar ? "الرئيسية" : "Home"}
									</a>
								</Link>
							</li>
							<li aria-current="page">
								<Link href={"/products"}>
									<a className="flex items-center gap-2">
										{/* <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg> */}
										<i
											className={`text-gray-400 mx-2 fas ${ar ? "fa-chevron-left" : "fa-chevron-right"
												}`}
										></i>
										<span className="capitalize text-sm font-medium text-gray-500">
											{ar ? "المنتجات" : "Products"}
										</span>
									</a>
								</Link>
							</li>
							<li aria-current="page">
								<div className="flex items-center gap-2">
									{/* <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg> */}
									<i
										className={`text-gray-400 mx-2 fas ${ar ? "fa-chevron-left" : "fa-chevron-right"
											}`}
									></i>
									<span className="capitalize text-sm font-medium text-gray-500">
										{ar ? product.name_ar : product.name}
									</span>
								</div>
							</li>
						</ol>
					</nav>
					<hr className="my-8 h-px bg-gray-200 border-0" />
					<div className="product grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="p-s">
							<ProductSwiper images={product.images} offer={product.options[0].discount} />
						</div>
						{/* ///////////////////////////////////////////////// */}
						<div>
							<div className="mb-4 border-b border-primary-100">
								<ul
									className="flex flex-wrap -mb-px text-sm font-medium text-center"
									id="myTab"
									data-tabs-toggle="#myTabContent"
									role="tablist"
								>
									<li className={ar ? "ml-2" : "mr-2"}>
										<button
											onClick={() => {
												tab != 1 && setTab(1);
											}}
											className={`inline-block p-4 rounded-t-lg border-b-0 ${tab == 1 &&
												"border-2 bg-primary-300 text-primary-100 border-primary-100 "
												}`}
										>
											{ar ? "الوصف" : "Description"}
										</button>
									</li>
									<li className={ar ? "ml-2" : "mr-2"}>
										<button
											onClick={() => {
												tab != 2 && setTab(2);
											}}
											className={`inline-block p-4 rounded-t-lg border-b-0 ${tab == 2 &&
												"border-2 bg-primary-300 text-primary-100 border-primary-100 "
												}`}
										>
											{ar ? "تفاصيل المنتج" : "Product Details"}
										</button>
									</li>
									<li className={ar ? "ml-2" : "mr-2"}>
										<button
											onClick={() => {
												tab != 3 && setTab(3);
											}}
											className={`inline-block p-4 rounded-t-lg border-b-0 ${tab == 3 &&
												"border-2 bg-primary-300 text-primary-100 border-primary-100 "
												}`}
										>
											{ar ? "المراجعات" : "Reviews"}
										</button>
									</li>
								</ul>
							</div>
							<div id="myTabContent">
								<div className={tab != 1 ? "hidden" : ""}>
									<div className="flex flex-col gap-4">
										<h2 className="text-2xl">
											{product && ar
												? product.name_ar
												: product.name}
										</h2>
										<p className="text-gray-600">
											{product.describtion
												? ar
													? product.describtion_ar
													: product.describtion
												: "no descrioption"}
										</p>
									</div>
								</div>
								<div className={tab != 2 ? "hidden" : ""}>
									<div className="flex flex-col gap-2 mb-2">
										<p className="text-gray-600">
											<span className="font-light capitalize">
												{ar ? "ماركة :" : "brand:"}
											</span>{" "}
											{ar
												? product.brand.name_ar
												: product.brand.name}
										</p>
										<p className="text-gray-600">
											<span className="font-light capitalize">
												{ar ? "الفئة :" : "category:"}
											</span>{" "}
											{ar
												? product.category.name_ar
												: product.category.name}
										</p>
										<p className="text-gray-600">
											<span className="font-light capitalize">
												{ar ? "كود المنتج :" : "product_code:"}
											</span>{" "}
											{product.product_code}
										</p>
										<p className="text-gray-600">
											<span className="font-light capitalize">
												{ar ? "اس ك يو (SKU) :" : "SKU:"}
											</span>{" "}
											{product.sku}
										</p>
									</div>
								</div>
								<div className={tab != 3 ? "hidden" : ""}>
									<ProductReviews reviews={reviews} />
								</div>
								{product.options[0].discount == 0 ? (
									<div className="text-xl text-gray-700 mt-8">
										{product.options[0].price} {ar ? "ريال" : "QR"} 
									</div>
								) : (
									<div className="text-xl text-gray-700 flex gap-2 mb-2 mt-8">
										<div>
											<span className="block text-sm line-through text-gray-500">
												{product.options[0].price} {ar ? "ريال" : "QR"}
												</span>
											{product.options[0].price_after_discount} {ar ? "ريال" : "QR"}
										</div>
									</div>
								)}
								<div
									className={`start text-xl ${product.rate < 1
										? "text-gray-300"
										: "text-yellow-500"
										}`}
								>
									<i
										className={`${product.rate >= 1 ? "fas" : "far"
											} fa-star`}
									></i>
									<i
										className={`${product.rate >= 2 ? "fas" : "far"
											} fa-star`}
									></i>
									<i
										className={`${product.rate >= 3 ? "fas" : "far"
											} fa-star`}
									></i>
									<i
										className={`${product.rate >= 4 ? "fas" : "far"
											} fa-star`}
									></i>
									<i
										className={`${product.rate >= 5 ? "fas" : "far"
											} fa-star`}
									></i>
									<span
										className={`bg-blue-100 ${product.rate < 1
											? "text-gray-300"
											: "text-blue-600"
											} text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3`}
									>
										{product.rate ? `${product.rate}.0` : 0}
									</span>
								</div>
								<div className="flex gap-2 flex-wrap my-4">
									{product.options.map((option, index) => {
										return (
											<>
												<button
													key={option.id}
													onClick={(e) =>
														selectOption(e, option.id)
													}
													className={
														index == 0
															? "px-4 py-2 rounded border border-primary-100 active-option"
															: "px-4 py-2 rounded border"
													}
												>
													{option.name}
												</button>
											</>
										);
									})}
								</div>
								{optionQ <= 5 && (
									<div className="text-sm bg-red-500/25 w-fit rounded-full mb-4 py-1 px-3 text-red-800">
										{ar && "يوجد"}{" "}
										{
											product.options.find(
												(option) => option.id == selectedOption
											).quantity
										}{" "}
										{ar ? "في المخزن" : "in stock"}
									</div>
								)}
								{/* {option.quantity < 5 && (<p>{option.quantity} in stock</p>)} */}
								<div className="flex items-center gap-3 mb-4">
									<button
										onClick={() =>
											setproCount(proCount == 1 ? 1 : proCount - 1)
										}
										className="inline-flex items-center p-2 font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
										type="button"
									>
										<svg
											className="w-4 h-4"
											aria-hidden="true"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
									<div>
										<input
											readOnly
											value={proCount > optionQ ? optionQ : proCount}
											type="number"
											max={optionQ}
											min={1}
											id="first_product"
											className="bg-gray-50 w-16 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3.5 py-1"
											placeholder={
												product.amount || product.quantity || 1
											}
											required
										/>
									</div>
									<button
										onClick={() =>
											setproCount(proCount >= 10 ? 10 : proCount + 1)
										}
										className="inline-flex items-center p-2 font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
										type="button"
									>
										<svg
											className="w-4 h-4"
											aria-hidden="true"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
								</div>
								<div className="flex gap-4 items-center">
									<div className="relative">
										<button
											dataSet="atbtn"
											className="atbtn text-white bg-primary-100 hover:bg-primary-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
											onClick={(e) =>
												addSelectedOptionToCart(e.target, proCount)
											}
										>
											{ar ? "اضف الي العربة" : "Add to cart"}
											<div className="done absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-600 rounded-lg hidden place-content-center text-xl">
												<i className="far fa-check-circle"></i>
											</div>
										</button>
									</div>
									<button
										className="text-xl border rounded self-stretch px-4 bg-gray-100 hover:shadow transition hover:scale-105 text-red-600"
										// title="Add product to wishlist"
										title={ar ? "أضف المنتج إلى قائمة الرغبات" : "Add product to wishlist"}
										onClick={() =>
											handleWishList(
												product.slug,
												product.is_wishlist
											)
										}
									>
										<i ref={heartIcon} className="far fa-heart"></i>
									</button>
									<button
										className="text-xl border rounded self-stretch px-4 bg-gray-100 hover:shadow transition hover:scale-105 text-blue-600"
										// title="Add product to comper list"
										title={ar ? "إضافة المنتج إلى قائمة المقارنة" : "Add product to comper list"}
										onClick={() => handleCompare(product.slug)}
									>
										<i
											ref={compareIcon}
											className="fas fa-random"
										></i>
									</button>
									<button
										className="text-xl border rounded self-stretch px-4 bg-gray-100 hover:shadow transition hover:scale-105 text-yellow-600"
										title={ar ? "مشاركة المنتج" : "Share product"}
										onClick={() => share()}
									>
										<i
											ref={compareIcon}
											className="fas fa-share-alt"
										></i>
									</button>
								</div>
							</div>
						</div>

						{/* ///////////////////////////////////////////////// */}
					</div>
					<hr className="my-8 h-px bg-gray-200 border-0" />
					<div className="mb-8">
						<h2 className="font-bold text-3xl mb-8">
							{ar ? "منتجات ذات صله" : "Related Products"}
						</h2>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{relatedPro.map((pro) => (
								<ProductBox key={pro.id} product={pro} />
							))}
						</div>
					</div>
				</div>
			</div>
		)}
		</>
	);
};

export default Product;