/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import Image from "next/image";
import img from "../public/images/empty-cart.png";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCartCount } from "../slices/cartIndicatorSlice";
import { useSelector } from "react-redux";
import DelivaryDetails from "../components/cartSections/DelivaryDetails";

// export const getStaticProps = async () => {
//    const res = await fetch('https://backends.donnachoice.com/api/products/?slug__in=product,item-2');
//    let products = await res.json();

//    return {
//       props: {
//          products,
//       }
//    }
// }

const getNumberOfProductsInCart = () => {
   const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || [];
   return storedCart.length;
};

const handleCartLocalStorage = (itemId) => {
   const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || [];
   const storedCartIds = storedCart.map((cartId) => cartId.id);
   if (storedCartIds.includes(itemId)) {
      for (let i = 0; i < storedCart.length; i++) {
         if (storedCart[i].id === itemId) {
            storedCart.splice(i, 1);
            break;
         }
      }
   }
   localStorage.setItem("stored-cart", JSON.stringify(storedCart));
};

const Cart = () => {
   const [amountStor, setAmountStor] = useState([]);
   const ar = useSelector((state) => state.langs.value);
   const [products, setProducts] = useState([]);
   // const [proCount, setproCount] = useState(0)
   const [loading, setLoading] = useState(true);
   const [totalAmount, setTotalAmount] = useState(0);
   const [totalPrice, setTotalPrice] = useState(0);
   const dispatch = useDispatch();
   const [cartSections, setcartSections] = useState(1);

   useEffect(() => {
      const amounts = document.querySelectorAll(".product-amount");
      const prices = document.querySelectorAll(".product-total-price");
      setTotalAmount(0);
      setTotalPrice(0);
      for (let i = 0; i < amounts.length; i++) {
         setTotalAmount((x) => x + parseInt(amounts[i].textContent));
      }
      for (let i = 0; i < prices.length; i++) {
         setTotalPrice((x) => x + parseInt(prices[i].textContent));
      }
   }, [loading]);
   useEffect(() => {
      console.log(cartSections);
   }, [cartSections, loading]);
   useEffect(() => {
      const auth = Cookies.get("auth");
      if (auth) {
         axios
            .get("https://backends.donnachoice.com/api/products/cart/", {
               headers: {
                  Authorization: `Bearer ${Cookies.get("token")}`,
               },
            })
            .then((res) => {
               setProducts(res.data);
               // setproCount(res.data.added_quantity)
               setLoading(false);
            });
      } else {
         const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || [];
         setAmountStor(storedCart);
         if (storedCart.length < 1) {
            storedCart.push("---");
            setProducts([]);
            setLoading(false);
            return;
         }
         console.log(storedCart);
         const storedCartIds = storedCart.map((item) => item.id);
         axios
            .get(
               `https://backends.donnachoice.com/api/products/options/?ids=${storedCartIds}`
            )
            .then((res) => {
               console.log(res.data);
               setProducts(res.data);
               setLoading(false);
            });
      }
   }, [loading]);

   const removeProductFromCart = (itemId) => {
      setLoading(true);
      const auth = Cookies.get("auth");
      if (auth) {
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
         handleCartLocalStorage(itemId);
         dispatch(setCartCount(getNumberOfProductsInCart()));
      }
   };

   if (loading) {
      return (
         <>
            <div>
               <p>Loading</p>
            </div>
         </>
      );
   }

   return (
      <div dir={ar ? "rtl" : "ltr"} className="container">
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
                  <div className="flex items-center gap-2">
                     {/* <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg> */}
                     <i
                        className={`text-gray-400 mx-2 fas ${ar ? "fa-chevron-left" : "fa-chevron-right"
                           }`}
                     ></i>
                     <span className="capitalize text-sm font-medium text-gray-500">
                        {ar ? "عربة التسوق" : "Cart"}
                     </span>
                  </div>
               </li>
            </ol>
         </nav>
         {ar ? (
            <h2 className="text-3xl text-gray-700">
               عناصر عربة التسوق/
               <span className="text-sm">
                  أضف جديدًا أو استخدم عنوان التسليم الحالي.
               </span>
            </h2>
         ) : (
            <h2 className="text-3xl text-gray-700">
               Delivery Details /
               <span className="text-sm">
                  Add new or use existing delivery address.
               </span>
            </h2>
         )}

         <div className="mt-8">
            <div className="hidden lg:block mb-4 border-gray-200 bg-primary-300 text-primary-100  rounded-lg overflow-hidden">
               <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                  <li className={`grow ${cartSections == 1 && "active_cart_part"}`}>
                     <div
                        className={`flex gap-4 justify-center items-center py-4 ${ar ? "border-l" : "border-r"
                           } border-primary-100`}
                     >
                        <i className="fad fa-bags-shopping text-xl"></i>
                        {ar ? "عناصر عربة التسوق" : "Cart items"}
                     </div>
                  </li>
                  <li className={`grow ${cartSections == 2 && "active_cart_part"}`}>
                     <div
                        className={`flex gap-4 justify-center items-center py-4 ${ar ? "border-l" : "border-r"
                           } border-primary-100`}
                     >
                        <i className="fad fa-truck-loading text-xl"></i>
                        {ar ? "تفاصيل التسليم" : "Delivery Details"}
                     </div>
                  </li>
                  <li className={`grow ${cartSections == 3 && "active_cart_part"}`}>
                     <div
                        className={`flex gap-4 justify-center items-center py-4 ${ar ? "border-l" : "border-r"
                           } border-primary-100`}
                     >
                        <i className="fad fa-credit-card text-xl"></i>
                        {ar ? "خيارات الدفع" : "Payment Options"}
                     </div>
                  </li>
                  <li className={`grow ${cartSections == 4 && "active_cart_part"}`}>
                     <div className="flex gap-4 justify-center items-center py-4">
                        <i className="fad fa-check-square text-xl"></i>
                        {ar ? "أكد الطلب" : "Confirm order"}
                     </div>
                  </li>
               </ul>
            </div>
            {cartSections == 1 &&
               (products.length == 0 ? (
                  <div className="text-2xl capitalize text-center col-span-4">
                     <div className="max-w-[500px] mx-auto">
                        <Image src={img} alt="no result" />
                     </div>
                     {ar
                        ? "لا توجد منتجات في عربة التسوق الخاصة بك"
                        : "There no products in your cart."}{" "}
                     <br />
                     <Link href={"/products"}>
                        <div className="w-full max-w-[200px] text-center bg-primary-100 text-white rounded py-3 px-5 mx-auto cursor-pointer my-8">
                           {ar ? "تسوق الآن" : "Shopping Now"}
                        </div>
                     </Link>
                  </div>
               ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 mb-8">
                     <div className="col-span-8 lg:col-span-6 overflow-x-auto relative h-fit rounded-lg border">
                        <table
                           className={`w-full text-sm text-left text-gray-500 ${ar && "text-right"
                              }`}
                        >
                           <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                              <tr className="border-b">
                                 <th scope="col" className="p-4">
                                    #
                                 </th>
                                 <th scope="col" className="py-3 px-6">
                                    {ar ? "المنتج" : "Product"}
                                 </th>
                                 <th scope="col" className="py-3 px-6">
                                    {ar ? "السعر" : "Price (QA)"}
                                 </th>
                                 <th scope="col" className="py-3 px-6">
                                    {ar ? "العدد" : "Count"}
                                 </th>
                                 {/* <th scope="col" className="py-3 px-6">
                                 Total (QA)
                              </th> */}
                                 <th scope="col" className="py-3 px-6">
                                    {/* Action */}
                                 </th>
                              </tr>
                           </thead>
                           <tbody>
                              {products.length == 0
                                 ? "there is no products in cart yet."
                                 : products.map((product, index) => {
                                    return (
                                       <tr key={product.id} className="bg-white border-b">
                                          <td className="p-4 w-4">{index + 1}</td>
                                          <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                             <img
                                                className="h-12 aspect-square object-cover"
                                                src={
                                                   product.product.images.length == 0
                                                      ? "https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
                                                      : product.product.images[0].img
                                                }
                                                alt={product.product.name}
                                             />
                                             {/* {`${product.product.name} (${product.name})`} */}
                                             {ar
                                                ? product.product.name_ar
                                                : product.product.name}{" "}
                                             ({product.name})
                                          </th>
                                          <td className="py-4 px-6">{product.price}</td>
                                          <td className="py-4 px-6 product-amount">
                                             <div className="flex items-center gap-3">
                                                <button
                                                   onClick={() => setproCount(proCount - 1)}
                                                   className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                                   type="button"
                                                >
                                                   <span className="sr-only">
                                                      Quantity button
                                                   </span>
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
                                                      defaultValue={
                                                         product.added_quantity ||
                                                         amountStor.find(
                                                            (item) => (item.id = product.id)
                                                         ).amount
                                                      }
                                                      type="number"
                                                      min={1}
                                                      id="first_product"
                                                      className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                                                      required
                                                   />
                                                </div>
                                                <button
                                                   onClick={() => setproCount(proCount + 1)}
                                                   className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                                   type="button"
                                                >
                                                   <span className="sr-only">
                                                      Quantity button
                                                   </span>
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
                                          </td>
                                          {/* <td className="py-4 px-6 product-total-price">
                                             {(product.amount || product.quantity || 1) * product.price}
                                          </td> */}
                                          <td className="py-4 px-6">
                                             <button
                                                onClick={() =>
                                                   removeProductFromCart(product.id)
                                                }
                                                className="px-4 py-2 rounded text-xl text-white bg-red-700"
                                             >
                                                <i className="fad fa-trash-alt"></i>
                                             </button>
                                          </td>
                                       </tr>
                                    );
                                 })}
                           </tbody>
                        </table>
                     </div>
                     <div className="col-span-8 lg:col-span-2 flex flex-col gap-4">
                        <div className="bg-gray-50 p-4 border rounded-md">
                           <h4 className="text-2xl mb-4">{ar ? "ملخص" : "SUMMARY"}</h4>
                           <div className="capitalize">
                              {ar ? "مجموع العناصر :" : "total items: "}
                              <span className="text-xl font-bold"> {totalAmount}</span>
                           </div>
                           <div className="capitalize">
                              {ar ? "السعر الإجمالي (ريال قطري)" : "total price (QR) : "}
                              <span className="text-xl font-bold"> {totalPrice}</span>
                           </div>
                        </div>
                        <button
                           type="button"
                           onClick={() => setcartSections(2)}
                           className="w-full bg-primary-100 text-white rounded-md py-4"
                        >
                           {ar ? "التالي" : "Next"}{" "}
                           <i
                              className={`fas ${ar ? "fa-arrow-left" : "fa-arrow-right"}`}
                           ></i>{" "}
                           {ar ? "توصيل" : "Delivery"}
                        </button>
                     </div>
                  </div>
               ))}
            {cartSections == 2 && (
               <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 mb-8">
                  <div className="col-span-8 lg:col-span-6">
                     <DelivaryDetails />
                  </div>
                  <div className="col-span-8 lg:col-span-2 flex flex-col gap-4">
                     <div className="bg-gray-50 p-4 border rounded-md">
                        <h4 className="text-2xl mb-4">{ar ? "ملخص" : "SUMMARY"}</h4>
                        <div className="capitalize">
                           {ar ? "مجموع العناصر :" : "total items: "}
                           <span className="text-xl font-bold"> {totalAmount}</span>
                        </div>
                        <div className="capitalize">
                           {ar ? "السعر الإجمالي (ريال قطري)" : "total price (QR) : "}
                           <span className="text-xl font-bold"> {totalPrice}</span>
                        </div>
                     </div>
                     <div className="flex gap-4">
                     <button
                        type="button"
                        onClick={() => setcartSections(1)}
                        className="bg-primary-100 text-white flex gap-2 items-center rounded-md p-4 whitespace-nowrap"
                     >
                        <i
                           className={`fas ${ar ? "fa-arrow-right" : "fa-arrow-left"}`}
                        ></i>
                        Back
                     </button>
                     <button
                        type="button"
                        onClick={() => setcartSections(3)}
                        className="w-full bg-primary-100 text-white rounded-md py-4 flex items-center gap-2 justify-center"
                     >
                        {ar ? "التالي" : "Next"}{" "}
                        <i
                           className={`fas ${ar ? "fa-arrow-left" : "fa-arrow-right"}`}
                        ></i>{" "}
                        {ar ? "الدفع" : "Payment"}
                     </button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default Cart;
