/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import img from "../public/images/empty-cart.png";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCartCount } from "../slices/cartIndicatorSlice";
import { useSelector } from "react-redux";
import DelivaryDetails from "../components/cartSections/DelivaryDetails";
import CarP from "../components/placeholder/CarP";
import Confirm from "../components/cartSections/Confirm";
import InnerHTML from "dangerously-set-html-content";
import swal from "sweetalert";

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
   const [payment, setPayment] = useState(false);
   const [loading, setLoading] = useState(true);
   const [totalAmount, setTotalAmount] = useState(0);
   const [totalPrice, setTotalPrice] = useState(0);
   const dispatch = useDispatch();
   const [cartSections, setcartSections] = useState(1);
   const [paymentForm, setPaymentForm] = useState("");
   const [fastDelivary, setFastDelivary] = useState(false);
   const [btnLoading, setBtnLoading] = useState(false);

   

   useEffect(() => {
      const amounts = document.querySelectorAll(".product-amount-value");
      const prices = document.querySelectorAll(".product-total-price");
      const edit_amounts = document.querySelectorAll(".edit_amount");
      // setTotalAmount(0);
      // setTotalPrice(0);
      // set total amount and price
      const setTotalAP = () => {
         for (let i = 0; i < amounts.length; i++) {
               setTotalAmount((x) => x + parseInt(amounts[i].value));
               setTotalPrice(
                  (x) =>
                     x + parseInt(prices[i].textContent) * parseInt(amounts[i].value)
               );
            }
      };
      setTotalAP();
      // edit amount
      // edit_amounts.forEach((edit_amount) => {
      //    edit_amount.addEventListener("click", (e) => {
      //       // console.log(e.target.classList);
      //       if (e.target.textContent === "+" && totalAmount < 10) {
      //          setTotalAmount(totalAmount++);
      //       }
      //       if (e.target.textContent === "-" && totalAmount > 1) {
      //          setTotalAmount(totalAmount--);
      //       }
      //    });
      // });

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
               setLoading(false);
            });
      } else {
         const storedCart =
            JSON.parse(localStorage.getItem("stored-cart")) || [];
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
      setcartSections(next);
      window.scrollTo(0, 0);
   };

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
      setUserInfo(valuse);
   };
   const pay = () => {
      setBtnLoading(true);
      if (payment) {
         axios
            .post(
               "https://backends.donnachoice.com/api/payment/create_online_order/",
               JSON.parse(localStorage.getItem("delivaryDetails")),
               {
                  headers: {
                     Authorization: `Bearer ${Cookies.get("token")}`,
                  },
               }
            )
            .then((res) => {
               console.log(res.data);
               if (res.data.form) {
                  setPaymentForm(res.data.form);
               } else {
                  swal(ar ? "خطأ !" :"Error!", ar ? res.data.error_ar : res.data.error, "error").then(() =>
                     location.reload()
                  );
               }
               setBtnLoading(false);
               
            });
      } else {
         axios
            .post(
               "https://backends.donnachoice.com/api/payment/create_cash_order/",
               JSON.parse(localStorage.getItem("delivaryDetails")),
               {
                  headers: {
                     Authorization: `Bearer ${Cookies.get("token")}`,
                  },
               }
            )
            .then((res) => {
               if (res.data.success) {
                  swal("Order Done!", "lorem ipsome!", "success").then(() =>
                     location.reload()
                  );
               } else {
                  swal(ar ? "خطأ !" :"Error!", ar ? res.data.error_ar : res.data.error, "error").then(() =>
                     location.reload()
                  );
               }
               console.log(res.data);
               setBtnLoading(false);
            });
      }
   };

   const decreaseProductAmount = (e) => {
      const input = e.target.parentElement.querySelector("input");
      if (input.value > 1) {
         input.value = parseInt(input.value) - 1;
         setTotalAmount(totalAmount- 1);
         setTotalPrice(totalPrice - +input.dataset.price);
      }
   };

   const increaseProductAmount = (e) => {
      const input = e.target.parentElement.querySelector("input");
      if (parseInt(input.value) <= 9) {
         input.value = parseInt(input.value) + 1;
         setTotalAmount(totalAmount+ 1);
         setTotalPrice(totalPrice + +input.dataset.price);
      }
   };

   const updateQuantity = () => {
      const tableRows = document.querySelectorAll("tbody tr");
      tableRows.forEach((row) => {
         const productId = row.id;
         const productAmount = row.querySelector(".product_amount").value;

         const auth = Cookies.get("auth");
         if (auth) {
            axios
               .patch(
                  `https://backends.donnachoice.com/api/products/cart/`,
                  {
                     option: +productId,
                     quantity: +productAmount,
                  },
                  {
                     headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                     },
                  }
               )
               .then((res) => {
                  console.log(res.data);
               })
               .catch((err) => {
                  console.log(err);
               });
         } else {
            const storedCart =
               JSON.parse(localStorage.getItem("stored-cart")) || [];
            const storedCartIds = storedCart.map((item) => item.id);
            const index = storedCartIds.indexOf(productId);
            if (index > -1) {
               storedCart[index].quantity = productAmount;
            }
            localStorage.setItem("stored-cart", JSON.stringify(storedCart));
            dispatch(setCartCount(getNumberOfProductsInCart()));
         }
      });
   };

   if (loading) {
      return <CarP />;
   }

   return (
      <div dir={ar ? "rtl" : "ltr"} className="container mt-8">
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
                        className={`text-gray-400 mx-2 fas ${
                           ar ? "fa-chevron-left" : "fa-chevron-right"
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
               <span>
                  {cartSections == 1 &&
                     (ar ? "عناصر عربة التسوق" : "Cart items")}
                  {cartSections == 2 &&
                     (ar ? "تفاصيل التسليم" : "Delivery Details")}
                  {cartSections == 3 &&
                     (ar ? "خيارات الدفع" : "Payment Options")}
                  {cartSections == 4 && (ar ? "أكد الطلب" : "Confirm order")}
               </span>
            </h2>
         )}

         <div className="mt-8">
            <div className="hidden lg:block mb-4 border-gray-200 bg-primary-300 text-primary-100  rounded-lg overflow-hidden">
               <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                  <li
                     className={`grow ${
                        cartSections == 1 && "active_cart_part"
                     }`}
                  >
                     <div
                        className={`flex gap-4 justify-center items-center py-4 ${
                           ar ? "border-l" : "border-r"
                        } border-primary-100`}
                     >
                        <i className="fad fa-bags-shopping text-xl"></i>
                        {ar ? "عناصر عربة التسوق" : "Cart items"}
                     </div>
                  </li>
                  <li
                     className={`grow ${
                        cartSections == 2 && "active_cart_part"
                     }`}
                  >
                     <div
                        className={`flex gap-4 justify-center items-center py-4 ${
                           ar ? "border-l" : "border-r"
                        } border-primary-100`}
                     >
                        <i className="fad fa-truck-loading text-xl"></i>
                        {ar ? "تفاصيل التسليم" : "Delivery Details"}
                     </div>
                  </li>
                  <li
                     className={`grow ${
                        cartSections == 3 && "active_cart_part"
                     }`}
                  >
                     <div
                        className={`flex gap-4 justify-center items-center py-4 ${
                           ar ? "border-l" : "border-r"
                        } border-primary-100`}
                     >
                        <i className="fad fa-credit-card text-xl"></i>
                        {ar ? "خيارات الدفع" : "Payment Options"}
                     </div>
                  </li>
                  <li
                     className={`grow ${
                        cartSections == 4 && "active_cart_part"
                     }`}
                  >
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
                           className={`w-full text-sm text-left text-gray-500 ${
                              ar && "text-right"
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
                                 <th scope="col" className="py-3 px-6"></th>
                              </tr>
                           </thead>
                           <tbody>
                              {products.length == 0
                                 ? "there is no products in cart yet."
                                 : products.map((product, index) => {
                                      return (
                                         <tr
                                            id={product.id}
                                            key={product.id}
                                            className="bg-white border-b"
                                         >
                                            <td className="p-4 w-4">
                                               {index + 1}
                                            </td>
                                            <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                               <img
                                                  className="h-12 aspect-square object-cover"
                                                  src={
                                                     product.product.images
                                                        .length == 0
                                                        ? "https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
                                                        : product.product
                                                             .images[0].img
                                                  }
                                                  alt={product.product.name}
                                               />
                                               <Link
                                                  href={`/products/${product.product.slug}`}
                                               >
                                                  <a className="hover:underline">
                                                     {ar
                                                        ? product.product
                                                             .name_ar
                                                        : product.product.name}
                                                  </a>
                                               </Link>
                                            </th>
                                            <td className="py-4 px-6">
                                               {ar ? "ريال" : "QR"}
                                               <span className="product-total-price">
                                                  {product.price}
                                               </span>
                                            </td>
                                            <td className="py-4 px-6 product-amount">
                                               <div className="flex items-center gap-3">
                                                  {/* <div> */}
                                                  {/* <input
                                                        readOnly
                                                        defaultValue={
                                                           product.added_quantity ||
                                                           amountStor.find(
                                                              (item) =>
                                                                 (item.id =
                                                                    product.id)
                                                           ).amount
                                                        }
                                                        type="number"
                                                        min={1}
                                                         max={product.product.stock}
                                                        id="first_product"
                                                        className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 product-amount-value"
                                                        required
                                                     /> */}
                                                  {/* <div className="flex items-center space-x-3"> */}
                                                  <button
                                                     className="edit_amount remove inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 h-6 w-6 justify-center"
                                                     type="button"
                                                     onClick={
                                                        decreaseProductAmount
                                                     }
                                                  >
                                                     -
                                                  </button>
                                                  <div>
                                                     <input
                                                        readOnly
                                                        defaultValue={
                                                           product.added_quantity ||
                                                           amountStor.find(
                                                              (item) =>
                                                                 (item.id =
                                                                    product.id)
                                                           ).amount
                                                        }
                                                        type="number"
                                                        min={1}
                                                        max={10}
                                                        id="product_amount"
                                                        className="product_amount bg-gray-50 outline-none w-14 border border-gray-300 text-gray-900 text-sm rounded-lg block px-2.5 py-1 product-amount-value"
                                                        placeholder="1"
                                                        data-price={product.price}
                                                        required
                                                     />
                                                  </div>
                                                  <button
                                                     className="edit_amount add inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 h-6 w-6 justify-center"
                                                     type="button"
                                                     onClick={
                                                        increaseProductAmount
                                                     }
                                                  >
                                                     +
                                                  </button>
                                                  {/* </div>
                                                  </div> */}
                                               </div>
                                            </td>
                                            <td className="py-4 px-6">
                                               <button
                                                  onClick={() =>
                                                     removeProductFromCart(
                                                        product.id
                                                     )
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
                           <h4 className="text-2xl mb-4">
                              {ar ? "ملخص" : "SUMMARY"}
                           </h4>
                           <div className="capitalize">
                              {ar ? "مجموع العناصر :" : "total items: "}
                              <span className="text-xl font-bold">
                                 {" "}
                                 {totalAmount}
                              </span>
                           </div>
                           <div className="capitalize">
                              {ar
                                 ? "السعر الإجمالي (ريال قطري)"
                                 : "total price (QR) : "}
                              <span className="text-xl font-bold">
                                 {" "}
                                 {totalPrice}
                              </span>
                           </div>
                        </div>
                        <button
                           type="button"
                           onClick={() => {
                              nextstep(2), updateQuantity();
                           }}
                           className="w-full bg-primary-100 text-white rounded-md py-4"
                        >
                           {ar ? "التالي" : "Next"}{" "}
                           <i
                              className={`fas ${
                                 ar ? "fa-arrow-left" : "fa-arrow-right"
                              }`}
                           ></i>{" "}
                           {ar ? "توصيل" : "Delivery"}
                        </button>
                     </div>
                  </div>
               ))}
            {cartSections == 2 && (
               <DelivaryDetails
                  callback={setValuse}
                  setcartSections={setcartSections}
                  totalAmount={totalAmount}
                  totalPrice={totalPrice}
                  nextstep={nextstep}
                  setFastDelivary={setFastDelivary}
               />
            )}
            {cartSections == 3 && (
               <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 mb-8">
                  <div className="col-span-8 lg:col-span-6">
                     <div className="bg-gray-50 border rounded-md p-4">
                        <div className="space-y-4">
                           <fieldset
                              id="group1"
                              className="grid grid-cols-2 gap-4"
                           >
                              <label
                                 htmlFor="cach"
                                 className="flex gap-2 justify-center items-center md:text-2xl font-bold border rounded-md p-4 bg-white"
                              >
                                 <input
                                    defaultChecked
                                    id="cach"
                                    type="radio"
                                    value="value1"
                                    name="group1"
                                    onChange={() => setPayment(!payment)}
                                 />
                                 {ar ? "كاش" : "Cash"}
                                 {/* <label htmlFor="cach">Cach</label> */}
                              </label>
                              <label
                                 htmlFor="online"
                                 className="flex gap-2 justify-center items-center md:text-2xl font-bold border rounded-md p-4 bg-white"
                              >
                                 <input
                                    type="radio"
                                    id="online"
                                    value="value2"
                                    name="group1"
                                    onChange={() => setPayment(!payment)}
                                 />
                                 {ar ? "الدفع الالكتروني" : "Online Payment"}
                                 {/* <label htmlFor="online">Online Payment</label> */}
                              </label>
                           </fieldset>
                           {payment ? (
                              <div className="text-center space-y-4">
                                 <div
                                    className={ar ? "text-right" : "text-left"}
                                 >
                                    <p className="mb-4">
                                       {ar
                                          ? "- وسيلة حديثة للدفع , سريعة وفعالة وأمنة"
                                          : "- A modern, safe and fast payment method to receive your package that’s highly recommended"}
                                    </p>
                                 </div>
                              </div>
                           ) : (
                              <div>
                                 {ar
                                    ? "- خيار سهل وأمن للدفع عند الإستلام"
                                    : "- An easy and safe choice to receive your order and pay on your doorstep"}
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
                  <div className="col-span-8 lg:col-span-2 flex flex-col gap-4">
                     <div className="bg-gray-50 p-4 border rounded-md">
                        <h4 className="text-2xl mb-4">
                           {ar ? "ملخص" : "SUMMARY"}
                        </h4>
                        <div className="capitalize">
                           {ar ? "مجموع العناصر :" : "total items: "}
                           <span className="text-xl font-bold">
                              {" "}
                              {totalAmount}
                           </span>
                        </div>
                        <div className="capitalize">
                           {ar
                              ? "السعر الإجمالي (ريال قطري)"
                              : "total price (QR) : "}
                           <span className="text-xl font-bold">
                              {" "}
                              {totalPrice} <br />
                              {fastDelivary && (
                                 <span className="fastD text-sm font-normal">
                                    <i className="fad fa-check-circle text-green-600"></i>{" "}
                                    {ar
                                       ? "التوصيل السريع فقط +15 ريال"
                                       : "Fast Delivary just +15 QR"}{" "}
                                    <i className="fad fa-shipping-fast text-xl text-primary-100"></i>
                                 </span>
                              )}
                           </span>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <button
                           type="button"
                           onClick={() => setcartSections(2)}
                           className="bg-primary-100 text-white flex gap-2 items-center rounded-md p-4 whitespace-nowrap"
                        >
                           <i
                              className={`fas ${
                                 ar ? "fa-arrow-right" : "fa-arrow-left"
                              }`}
                           ></i>
                           {ar ? "عودة" : "Back"}
                        </button>
                        <button
                           // title={payment ? "disabled" : ""}
                           // disabled={payment}
                           type="button"
                           onClick={() => setcartSections(4)}
                           className="w-full bg-primary-100 text-white rounded-md py-4 flex items-center gap-2 justify-center"
                           // className={`w-full bg-primary-100 text-white rounded-md py-4 flex items-center gap-2 justify-center ${payment && "bg-gray-300 text-gray-200"}`}
                        >
                           {ar ? "التالي" : "Next"}{" "}
                           <i
                              className={`fas ${
                                 ar ? "fa-arrow-left" : "fa-arrow-right"
                              }`}
                           ></i>{" "}
                           {ar ? "أكد الطلب" : "Confirm order"}
                        </button>
                     </div>
                  </div>
               </div>
            )}
            {cartSections == 4 && (
               <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 mb-8">
                  <Confirm
                     data={JSON.parse(localStorage.getItem("delivaryDetails"))}
                  />
                  {paymentForm && (
                     <>
                        <InnerHTML html={paymentForm} />
                     </>
                  )}
                  <div className="col-span-8 lg:col-span-2 flex flex-col gap-4">
                     <div className="bg-gray-50 p-4 border rounded-md">
                        <h4 className="text-2xl mb-4">
                           {ar ? "ملخص" : "SUMMARY"}
                        </h4>
                        <div className="capitalize">
                           {ar ? "مجموع العناصر :" : "total items: "}
                           <span className="text-xl font-bold">
                              {" "}
                              {totalAmount}
                           </span>
                        </div>
                        <div className="capitalize">
                           {ar
                              ? "السعر الإجمالي (ريال قطري)"
                              : "total price (QR) : "}
                           <span className="text-xl font-bold">
                              {" "}
                              {totalPrice} <br />
                              {fastDelivary && (
                                 <span className="fastD text-sm font-normal">
                                    <i className="fad fa-check-circle text-green-600"></i>{" "}
                                    {ar
                                       ? "التوصيل السريع فقط +15 ريال"
                                       : "Fast Delivary just +15 QR"}{" "}
                                    <i className="fad fa-shipping-fast text-xl text-primary-100"></i>
                                 </span>
                              )}
                           </span>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <button
                           type="button"
                           onClick={() => setcartSections(3)}
                           className="bg-primary-100 text-white flex gap-2 items-center rounded-md p-4 whitespace-nowrap"
                        >
                           <i
                              className={`fas ${
                                 ar ? "fa-arrow-right" : "fa-arrow-left"
                              }`}
                           ></i>
                           {ar ? "عودة" : "Back"}
                        </button>
                        <button
                           disabled={btnLoading}
                           type="button"
                           onClick={pay}
                           className="w-full bg-primary-100 text-white rounded-md py-4 flex items-center gap-2 justify-center"
                        >
                           {btnLoading ? (
                              <i className="fas fa-spinner fa-spin"></i>
                           ) : (
                              <span>
                                 {ar ? "التالي" : "Next"}
                                 <i
                                    className={`fas ${
                                       ar ? "fa-arrow-left" : "fa-arrow-right"
                                    }`}
                                 ></i>{" "}
                                 {ar ? "أكد الطلب" : "Confirm order"}
                              </span>
                              )}
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
