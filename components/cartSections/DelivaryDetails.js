/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { setAmount } from "../../slices/wishlistIndicatorSlice";
import { setCartCount } from "../../slices/cartIndicatorSlice";
import Link from "next/link";

const DelivaryDetails = (props) => {
   const [phoneCode, setPhoneCode] = useState();
   const [country, setCountry] = useState();
   const [fastD, setFastD] = useState(false);
   const ar = useSelector((state) => state.langs.value);
   const delivaryDetails = JSON.parse(localStorage.getItem("delivaryDetails"));
   const [formloading, setformloading] = useState(false);
   const [emailErr, setEmailErr] = useState();
   const [phoneErr, setPhoneErr] = useState();
   const auth = Cookies.get("auth");
   const dispatch = useDispatch();

   const handlePhoneCode = () => {
      let e = document.querySelector("select");
      let value = e.options[e.selectedIndex].value;
      var text = e.options[e.selectedIndex].text;
      setPhoneCode(value);
      console.log(value);
      setCountry(text);
   };

   const fast = () => {
      let fastDelivary = document.getElementById("fastDelivary");
      setFastD(fastDelivary.checked);
      props.setFastDelivary(fastDelivary.checked);
   };


      // block letters from inputs type number
      const BLFNI = () => {
         let inputs = document.querySelectorAll("input[type=number]");
         const blockLetters = ["e", "E", "+", "-"];
         inputs.forEach((input) => {
            input.addEventListener("input", (e) => {
               e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0,8)
               if (blockLetters.includes(e.key)) {
                  e.preventDefault();
               }
            });
         });
      };

   useEffect(() => {
      BLFNI();
      let e = document.querySelector("select");
      let phoneCode = e.options[e.selectedIndex].value;
      let country = e.options[e.selectedIndex].text;
      setPhoneCode(e.options[e.selectedIndex].value);

      // setPhoneCode(e.options[e.selectedIndex].value);
      // setCountry(e.options[e.selectedIndex].text);
      // console.log(e.options[e.selectedIndex].value);
      // console.log(e.options[e.selectedIndex].text);

      let delivaryForm = document.querySelector(".delivaryform");
      delivaryForm.addEventListener("submit", (e) => {
         e.preventDefault();
      });
      delivaryForm.onsubmit = (e) => {
         e.preventDefault();
         let first_name = document.getElementById("first_name"),
            last_name = document.getElementById("last_name"),
            phone = document.getElementById("phone"),
            alt_phone = document.getElementById("alt_phone"),
            email = document.getElementById("email"),
            city = document.getElementById("State"),
            zone_number = document.getElementById("zone"),
            building_number = document.getElementById("Address"),
            street_number = document.getElementById("Street"),
            fastDelivary = document.getElementById("fastDelivary"),
            notes = document.getElementById("notes");

         const USER_INFO = {
            first_name: first_name.value,
            last_name: last_name.value,
            country_code: phoneCode,
            phone: phone.value,
            alt_phone: alt_phone.value,
            email: email.value,
            country: country,
            city: city.value,
            zone_number: zone_number.value,
            building_number: building_number.value,
            street_number: street_number.value,
            notes: notes.value,
            fast_delivery: fastDelivary.checked,
         };
         e.preventDefault();
         localStorage.setItem("delivaryDetails", JSON.stringify(USER_INFO));
         // console.log(USER_INFO);
         setformloading(true);
         if (auth) {
            props.nextstep(3);
            setformloading(false);
         } else {
            axios
               .post(
                  "https://backends.donnachoice.com/api/users/random-password/",
                  USER_INFO
               )
               .then((res) => {
                  console.log(res.data);
                  Cookies.set("token", res.data.access);
                  Cookies.set("auth", true);
                  localStorage.setItem("user", JSON.stringify(res.data));
                  setformloading(false);
                  props.nextstep(3);
                  setEmailErr(false);
                  setPhoneErr(false);
                  // //////////////////////////////////////////////d
                  // Cookies.set("token", res.data.access);
                  // localStorage.setItem("user", JSON.stringify(res.data));
                  // Cookies.set("auth", true);
                  const storedCart =
                     JSON.parse(localStorage.getItem("stored-cart")) || [];
                  const modifiedStoredCart = [];
                  for (let i = 0; i < storedCart.length; i++) {
                     modifiedStoredCart.push({
                        option: storedCart[i].id,
                        quantity: storedCart[i].amount,
                     });
                  }
                  const storedWishlist =
                     JSON.parse(localStorage.getItem("stored-wishlist")) || [];
                  axios
                     .post(
                        `https://backends.donnachoice.com/api/products/cart/`,
                        modifiedStoredCart,
                        {
                           headers: {
                              Authorization: `Bearer ${Cookies.get("token")}`,
                           },
                        }
                     )
                     .then((res) => {
                        axios
                           .post(
                              `https://backends.donnachoice.com/api/products/update_wishlist/`,
                              {
                                 products: storedWishlist,
                              },
                              {
                                 headers: {
                                    Authorization: `Bearer ${Cookies.get(
                                       "token"
                                    )}`,
                                 },
                              }
                           )
                           .then((res) => {
                              axios
                                 .get(
                                    `https://backends.donnachoice.com/api/counts`,
                                    {
                                       headers: {
                                          Authorization: `Bearer ${Cookies.get(
                                             "token"
                                          )}`,
                                       },
                                    }
                                 )
                                 .then((res) => {
                                    dispatch(setAmount(res.data.wishlist));
                                    dispatch(setCartCount(res.data.cart));
                                    localStorage.setItem(
                                       "stored-cart",
                                       JSON.stringify([])
                                    );
                                    localStorage.setItem(
                                       "stored-wishlist",
                                       JSON.stringify([])
                                    );
                                    location.reload();
                                 });
                           });
                     });
                  // //////////////////////////////////////////////d
               })
               .catch((err) => {
                  console.log(err.response.data);
                  if (err.response.data.email) {
                     setEmailErr(err.response.data.email);
                  }
                  if (err.response.data.phone) {
                     setPhoneErr(err.response.data.phone);
                  }
                  setformloading(false);
               });
         }
      };
   }, []);
   return (
      <form className="delivaryform">
         <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 mb-8">
            <div className="col-span-8 lg:col-span-6">
               {emailErr && (
                  <div
                     className="p-4 flex justify-between items-center mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
                     role="alert"
                  >
                     <div>
                        <span className="font-bold">Email error!</span>
                        {"  "}
                        {emailErr}
                     </div>
                     <Link href={"/login"}>
                        <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
                           Login
                        </a>
                     </Link>
                  </div>
               )}
               {phoneErr && (
                  <div
                     className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
                     role="alert"
                  >
                     <span className="font-bold">Phone error!</span>
                     {"  "}
                     {phoneErr}
                  </div>
               )}

               <div className="bg-gray-50 border rounded-md p-4">
                  <div className="grid gap-6 mb-6 md:grid-cols-2 ">
                     <div>
                        <label
                           htmlFor="first_name"
                           className="block mb-2 text-sm font-medium text-gray-900"
                        >
                           {ar ? "الاسم الاول*" : "First name*"}
                        </label>
                        <input
                           type="text"
                           // defaultValue={delivaryDetails?.first_name}
                           id="first_name"
                           className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                           placeholder={ar ? "اسم" : "First Name..."}
                           required
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="last_name"
                           className="block mb-2 text-sm font-medium text-gray-900"
                        >
                           {ar ? "اللقب*" : "Last name*"}
                        </label>
                        <input
                           type="text"
                           // defaultValue={delivaryDetails?.last_name}
                           id="last_name"
                           className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                           placeholder={ar ? "اسم" : "Last Name..."}
                           required
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="email"
                           className="block mb-2 text-sm font-medium text-gray-900"
                        >
                           {ar ? "البريد الالكترونى*" : "Email address*"}
                        </label>
                        <input
                           type="email"
                           // defaultValue={delivaryDetails?.email}
                           id="email"
                           className={`bg-white border ${
                              emailErr ? "border-red-500" : "border-gray-300"
                           } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                           placeholder="name@info.com"
                           onChange={() => setEmailErr(false)}
                           required
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="countries"
                           className="block mb-2 text-sm font-medium text-gray-900"
                        >
                           {ar ? "البلد*" : "Country*"}
                        </label>
                        <select
                           onChange={() => handlePhoneCode()}
                           id="countries"
                           required
                           className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                           {/* <option value="">{ar ? "اختر دولة" : "Choose a country"}</option> */}
                           <option selected value="974">
                              {ar ? "قطر" : "Qatar"}
                           </option>
                           <option value="971">
                              {ar
                                 ? "الإمارات العربية المتحدة"
                                 : "United Arab Emirates"}
                           </option>
                           <option value="973">
                              {ar ? "مملكة البحرين" : "Kingdom of Bahrain"}
                           </option>
                           <option value="968">
                              {ar ? "سلطنة عمان" : "Sultanate of Oman"}
                           </option>
                           <option value="966">
                              {ar
                                 ? "المملكة العربية السعودية"
                                 : "The Kingdom of Saudi Arabia"}
                           </option>
                           <option value="965">
                              {ar ? "الكويت" : "Kuwait"}
                           </option>
                        </select>
                     </div>
                     <div>
                        <label
                           htmlFor="phone"
                           className="block mb-2 text-sm font-medium text-gray-900"
                        >
                           {ar ? "التليفون المحمول*" : "Mobile*"}
                        </label>
                        <div className="flex">
                           <span
                              className={`inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border ${
                                 ar
                                    ? "border-l-0 rounded-r-md"
                                    : "border-r-0 rounded-l-md"
                              } border-gray-300`}
                           >
                              +{phoneCode}
                           </span>
                           <input
                              type="number"
                              maxlength="8"
                              id="phone"
                              className={`rounded-none ${
                                 ar ? "rounded-l-lg" : "rounded-r-lg"
                              } bg-white border text-gray-900 block flex-1 min-w-0 w-full text-sm ${
                                 phoneErr ? "border-red-500" : "border-gray-300"
                              } p-2.5`}
                              placeholder="12345678"
                              onChange={() => setPhoneErr(false)}
                              required
                           />
                        </div>
                     </div>
                     <div>
                        <label
                           htmlFor="alt_phone"
                           className="block mb-2 text-sm font-medium text-gray-900"
                        >
                           {ar ? "هاتف بديل" : "Alt Phone"}
                        </label>
                        <input
                           type="number"
                           // onInput={(e) => {e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0,8)}}
                           maxlength="8"
                           // defaultValue={delivaryDetails?.alt_phone}
                           id="alt_phone"
                           className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                           placeholder="12345678"
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="State"
                           className="block mb-2 text-sm font-medium text-gray-900"
                        >
                           {ar ? "المدينة*" : "City*"}
                        </label>
                        <input
                           type="text"
                           // defaultValue={delivaryDetails?.city}
                           id="State"
                           className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                           required
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="Street"
                           className="block mb-2 text-sm font-medium text-gray-900"
                        >
                           {ar ? "رقم الشارع*" : "Street Number*"}
                        </label>
                        <input
                           type="number"
                           id="Street"
                           // defaultValue={delivaryDetails?.street_number}
                           className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                           required
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="zone"
                           className="block mb-2 text-sm font-medium text-gray-900"
                        >
                           {ar ? "رقم المنطقة*" : "Zone Number*"}
                        </label>
                        <input
                           type="number"
                           id="zone"
                           // defaultValue={delivaryDetails?.zone_number}
                           className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                           required
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="Address"
                           className="block mb-2 text-sm font-medium text-gray-900"
                        >
                           {ar ? "رقم المبني*" : "Building Number*"}
                        </label>
                        <input
                           type="number"
                           id="Address"
                           className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                           placeholder
                           required
                        />
                     </div>
                  </div>
                  <div>
                     <label
                        htmlFor="notes"
                        className="block mb-2 text-sm font-medium text-gray-900"
                     >
                        {ar ? "ملاحظات" : "Notes"}
                     </label>
                     <textarea
                        id="notes"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={ar ? "اترك ملاحظة..." : "Leave a note..."}
                        defaultValue={""}
                     />
                  </div>
                  <div className="my-4 flex gap-4">
                     <input
                        type="checkbox"
                        onChange={() => fast()}
                        // defaultChecked
                        name="fastDelivary"
                        id="fastDelivary"
                     />
                     <label htmlFor="fastDelivary">
                        {ar ? "توصيل سريع +15 ريال" : "Fast Delivary +15 QR"}
                     </label>
                  </div>
               </div>
            </div>
            <div className="col-span-8 lg:col-span-2 flex flex-col gap-4">
               <div className="bg-gray-50 p-4 border rounded-md">
                  <h4 className="text-2xl mb-4">{ar ? "ملخص" : "SUMMARY"}</h4>
                  <div className="capitalize">
                     {ar ? "مجموع العناصر :" : "total items: "}
                     <span className="text-xl font-bold">
                        {" "}
                        {props.totalAmount}
                     </span>
                  </div>
                  <div className="capitalize">
                     {ar ? "السعر الإجمالي (ريال قطري)" : "total price (QR) : "}
                     <span className="text-xl font-bold">
                        {" "}
                        {props.totalPrice} <br />
                        {fastD && (
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
                     onClick={() => props.setcartSections(1)}
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
                     type="submit"
                     className="w-full bg-primary-100 text-white rounded-md py-4 flex items-center gap-2 justify-center"
                  >
                     {formloading ? (
                        <div role="status">
                           <svg
                              aria-hidden="true"
                              className="mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                 fill="currentColor"
                              />
                              <path
                                 d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                 fill="currentFill"
                              />
                           </svg>
                           <span className="sr-only">Loading...</span>
                        </div>
                     ) : (
                        <>
                           {ar ? "التالي" : "Next"}{" "}
                           <i
                              className={`fas ${
                                 ar ? "fa-arrow-left" : "fa-arrow-right"
                              }`}
                           ></i>{" "}
                           {ar ? "الدفع" : "Payment"}
                        </>
                     )}
                  </button>
               </div>
            </div>
         </div>
      </form>
   );
};

export default DelivaryDetails;
