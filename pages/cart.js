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
import CarP from "../components/placeholder/CarP";

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
   const [payment, setPayment] = useState(false)
   const [loading, setLoading] = useState(true);
   const [totalAmount, setTotalAmount] = useState(0);
   const [totalPrice, setTotalPrice] = useState(0);
   const dispatch = useDispatch();
   const [cartSections, setcartSections] = useState(1);
   const [userInfo, setUserInfo] = useState({})
   const [paymentForm, setPaymentForm] = useState("")
   const [formloading, setformloading] = useState(false)
   const auth = Cookies.get("auth");

   useEffect(() => {
      // amounts.forEach(amount => {
      //    let val = amount.value
      //    console.log(parseInt(val) + parseInt(val));
      // })
      const amounts = document.querySelectorAll(".product-amount-value");
      const prices = document.querySelectorAll(".product-total-price");
      setTotalAmount(0);
      setTotalPrice(0);
      for (let i = 0; i < amounts.length; i++) {
         setTotalAmount((x) => x + parseInt(amounts[i].value));
         setTotalPrice((x) => x + (parseInt(prices[i].textContent) * parseInt(amounts[i].value)));
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

   const nextstep = (next) => {
      setcartSections(next)
      window.scrollTo(0, 0)
   }

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
   const setValuse = (valuse) => {
      setUserInfo(valuse)
   }
   const delivaryDetails = () => {
      console.log(userInfo);
      setformloading(true)
      if (auth) {
         nextstep(3)
      } else {
         axios.post("https://backends.donnachoice.com/api/users/random-password/", userInfo)
            .then(res => {
               console.log(res.data);
               Cookies.set("token", res.data.access)
               Cookies.set("auth", true)
               localStorage.setItem("user", JSON.stringify(res.data))
               setformloading(false)
               nextstep(3)
            }).catch(err => {
               console.log(err.data);
               setformloading(false)
            })
      }
   }

   const pay = () => {
      if (payment) {
         axios.post("https://backends.donnachoice.com/api/payment/create_online_order/", userInfo, {
            headers: {
               Authorization: `Bearer ${Cookies.get("token")}`,
            }
         })
         .then(res => {
            setPaymentForm(res.data.form)
            document.gosadad.submit();
         })
      } else {
         axios.post("https://backends.donnachoice.com/api/payment/create_cash_order/", userInfo, {
            headers: {
               Authorization: `Bearer ${Cookies.get("token")}`,
            },
         })
         .then(res => console.log(res.data))
      }
   }

   if (loading) {
      return <CarP />
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
                                          <td className="py-4 px-6">{ar ? "ريال" : "QR"}
                                             <span className="product-total-price">
                                                {product.price}
                                             </span>
                                          </td>
                                          <td className="py-4 px-6 product-amount">
                                             <div className="flex items-center gap-3">
                                                {/* <button
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
                                                </button> */}
                                                <div>
                                                   <input
                                                      readOnly
                                                      defaultValue={
                                                         product.added_quantity ||
                                                         amountStor.find(
                                                            (item) => (item.id = product.id)
                                                         ).amount
                                                      }
                                                      type="number"
                                                      min={1}
                                                      id="first_product"
                                                      className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 product-amount-value"
                                                      required
                                                   />
                                                </div>
                                                {/* <button
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
                                                </button> */}
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
                           onClick={() => nextstep(2)}
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
                     <DelivaryDetails callback={setValuse} />
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
                           {ar ? "عودة" : "Back"}
                        </button>
                        <button
                           type="button"
                           // onClick={() => nextstep(3)}
                           onClick={() => delivaryDetails()}
                           className="w-full bg-primary-100 text-white rounded-md py-4 flex items-center gap-2 justify-center"
                        >

                           {formloading ? (
                              <div role="status">
                                 <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                 </svg>
                                 <span className="sr-only">Loading...</span>
                              </div>)
                              :
                              (<>
                                 {ar ? "التالي" : "Next"}{" "}
                                 <i
                                    className={`fas ${ar ? "fa-arrow-left" : "fa-arrow-right"}`}
                                 ></i>{" "}
                                 {ar ? "الدفع" : "Payment"}
                              </>)
                           }
                        </button>
                     </div>
                  </div>
               </div>
            )}
            {cartSections == 3 && (
               <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 mb-8">
                  <div className="col-span-8 lg:col-span-6">
                     <div className="bg-gray-50 border rounded-md p-4">
                        <div className="space-y-4">
                           <fieldset id="group1" className="grid grid-cols-2 gap-4">
                              <label htmlFor="cach" className="flex gap-2 justify-center items-center text-2xl font-bold border rounded-md p-4 bg-white">
                                 <input defaultChecked id="cach" type="radio" value="value1" name="group1" onChange={() => setPayment(!payment)} />
                                 Cach
                                 {/* <label htmlFor="cach">Cach</label> */}
                              </label>
                              <label htmlFor="online" className="flex gap-2 justify-center items-center text-2xl font-bold border rounded-md p-4 bg-white">
                                 <input type="radio" id="online" value="value2" name="group1" onChange={() => setPayment(!payment)} />
                                 Online Payment
                                 {/* <label htmlFor="online">Online Payment</label> */}
                              </label>
                           </fieldset>
                           {payment ? (
                              <div className="text-center space-y-4">
                                 <div className={ar ? "text-right" : "text-left"}>
                                    <p className="mb-4">- Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae at rem corporis sint modi sunt minus quibusdam reprehenderit fugit minima, fuga aliquid inventore architecto corrupti voluptas illum cupiditate ratione delectus.</p>
                                    <p className="mb-4">- Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae at rem corporis sint modi sunt minus quibusdam reprehenderit fugit minima, fuga aliquid inventore architecto corrupti voluptas illum cupiditate ratione delectus.</p>
                                 </div>
                                 {/* <button className="bg-primary-100 shadow rounded-md text-primary-300 w-full p-4 max-w-sm m-auto font-bold text-xl">Pay now</button> */}
                              </div>
                           ) : (

                              <div>
                                 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid atque deleniti excepturi officia dolore consequuntur! Vel voluptatibus tenetur deserunt ut exercitationem officiis illo quo, facere temporibus voluptate soluta iste molestiae.
                              </div>
                           )}
                        </div>
                     </div>
                     {paymentForm && (
                        <div dangerouslySetInnerHTML={{ __html: paymentForm }}></div>
                     )}
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
                           onClick={() => setcartSections(2)}
                           className="bg-primary-100 text-white flex gap-2 items-center rounded-md p-4 whitespace-nowrap"
                        >
                           <i
                              className={`fas ${ar ? "fa-arrow-right" : "fa-arrow-left"}`}
                           ></i>
                           {ar ? "عودة" : "Back"}
                        </button>
                        <button
                           // title={payment ? "disabled" : ""}
                           // disabled={payment}
                           type="button"
                           onClick={() => pay()}
                           className="w-full bg-primary-100 text-white rounded-md py-4 flex items-center gap-2 justify-center"
                           // className={`w-full bg-primary-100 text-white rounded-md py-4 flex items-center gap-2 justify-center ${payment && "bg-gray-300 text-gray-200"}`}
                        >
                           {ar ? "التالي" : "Next"}{" "}
                           <i
                              className={`fas ${ar ? "fa-arrow-left" : "fa-arrow-right"}`}
                           ></i>{" "}
                           {ar ? "أكد الطلب" : "Confirm order"}
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
