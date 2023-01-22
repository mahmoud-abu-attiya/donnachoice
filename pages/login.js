/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import logo from "../public/images/logo.png";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux'
import { setAmount } from "../slices/wishlistIndicatorSlice"
import { setCartCount } from "../slices/cartIndicatorSlice"
import { useSelector } from "react-redux";
import swal from "sweetalert";

export default function Login() {
   const ar = useSelector(state => state.langs.value)
   const [log, setLog] = useState(1)
   const [loading, setLoading] = useState(false)
   const [emailError, setEmailError] = useState([])
   const [passwordError, setPasswordError] = useState([])
   const [logError, setLogError] = useState(false)
   const [forget, setForget] = useState(false);
   const [resetEmailError, setResetEmailError] = useState()
   const dispatch = useDispatch()
   useEffect(() => {
      let loginForm = document.getElementById("login_form")
      let signupForm = document.getElementById("signup_form")
      let forgotForm = document.getElementById("forgot_form")

      const resetPass = () => {
         const email = document.getElementById("Femail").value
         axios.post("https://backends.donnachoice.com/api/users/password-reset/", { email: email })
            .then(res => {
               console.log(res.data);
               swal("Done", "Check your email", "success",)
               setForget(false)
               setLog(1)
            }).catch(err => {
               console.log(err.response.data.email[0]);
               setResetEmailError(err.response.data.email[0])
            })
         console.log(email);
      }

      const handleLogin = () => {
         setLoading(true)
         let loginEmail = document.getElementById("Lemail")
         let loginPassword = document.getElementById("Lpassword")
         const myStatus = {
            email: loginEmail.value,
            password: loginPassword.value,
         }
         axios.post("https://backends.donnachoice.com/api/users/login/", myStatus)
            .then(res => {
               // console.log(res.data);
               Cookies.set("token", res.data.access)
               // Cookies.set("user_id", res.data.id)
               localStorage.setItem("user", JSON.stringify(res.data))
               Cookies.set("auth", true)
               const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || []
               const modifiedStoredCart = []
               for (let i = 0; i < storedCart.length; i++) {
                  modifiedStoredCart.push({
                     option: storedCart[i].id,
                     quantity: storedCart[i].amount
                  })
               }
               const storedWishlist = JSON.parse(localStorage.getItem("stored-wishlist")) || []
               axios.post(`https://backends.donnachoice.com/api/products/cart/`, modifiedStoredCart, {
                  headers: {
                     Authorization: `Bearer ${Cookies.get("token")}`,
                  },
               })
                  .then(res => {
                     axios.post(`https://backends.donnachoice.com/api/products/update_wishlist/`, {
                        products: storedWishlist
                     }, {
                        headers: {
                           Authorization: `Bearer ${Cookies.get("token")}`,
                        },
                     })
                        .then((res) => {
                           axios.get(`https://backends.donnachoice.com/api/counts`, {
                              headers: {
                                 Authorization: `Bearer ${Cookies.get("token")}`,
                              },
                           })
                              .then(res => {
                                 dispatch(setAmount(res.data.wishlist))
                                 dispatch(setCartCount(res.data.cart))
                                 localStorage.setItem("stored-cart", JSON.stringify([]))
                                 localStorage.setItem("stored-wishlist", JSON.stringify([]))
                                 location.reload();
                              })
                        })
                  })
               // console.log(res.data);
            }).catch(err => {
               setLoading(false)
               // console.log(err);
               // console.log(err.response);
               setLogError(true)
            })
      }

      const handleSignup = () => {
         const storedWishlist = JSON.parse(localStorage.getItem("stored-wishlist")) || []

         setLoading(true);
         setEmailError([])
         setPasswordError([])
         let firstName = document.getElementById("first_name")
         let lastName = document.getElementById("last_name")
         let signupEmail = document.getElementById("Semail")
         let signupPassword = document.getElementById("Spassword")

         const myStatus = {
            first_name: firstName.value,
            last_name: lastName.value,
            email: signupEmail.value,
            password: signupPassword.value,
            wishlist: storedWishlist,
         }

         axios.post(
            "https://backends.donnachoice.com/api/users/signup/",
            myStatus
         )
            .then(res => {
               // console.log(res.data);
               Cookies.set("token", res.data.access)
               // Cookies.set("user_id", res.data.id)
               localStorage.setItem("user", JSON.stringify(res.data))
               Cookies.set("auth", true)
               const storedCart = JSON.parse(localStorage.getItem("stored-cart")) || []
               const modifiedStoredCart = []
               for (let i = 0; i < storedCart.length; i++) {
                  modifiedStoredCart.push({
                     option: storedCart[i].id,
                     quantity: storedCart[i].amount
                  })
               }
               axios.post(`https://backends.donnachoice.com/api/products/cart/`, modifiedStoredCart, {
                  headers: {
                     Authorization: `Bearer ${Cookies.get("token")}`,
                  },
               })
                  .then(res => {
                     axios.get(`https://backends.donnachoice.com/api/counts`, {
                        headers: {
                           Authorization: `Bearer ${Cookies.get("token")}`,
                        },
                     })
                        .then(res => {
                           dispatch(setAmount(res.data.wishlist))
                           dispatch(setCartCount(res.data.cart))
                           localStorage.setItem("stored-cart", JSON.stringify([]))
                           localStorage.setItem("stored-wishlist", JSON.stringify([]))
                           location.reload();
                        })
                  })

            }).catch(err => {
               setLoading(false)
               let res = err.response.data
               console.log(res);
               if (res.hasOwnProperty("email")) {
                  // console.log(res.email);
                  setEmailError(res.email);
               }
               if (res.hasOwnProperty("password")) {
                  // console.log(res.password);
                  setPasswordError(res.password);
               }
            })
         console.log(myStatus);
      }

      if (log == 2) {
         signupForm.onsubmit = (e) => {
            e.preventDefault();
            handleSignup()
         }
      } else if (log == 1) {
         loginForm.onsubmit = (e) => {
            e.preventDefault();
            handleLogin()
         }
      } else {
         forgotForm.onsubmit = (e) => {
            e.preventDefault();
            resetPass();
         }
      }
   }, [log]);
   const handleForget = () => {
      setForget(true);
      setLog(false);
   }
   return (
      <div dir={ar ? "rtl" : "ltr"}>
         {log == 2 && (
            <section className="bg-gray-50">
               <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                  {/* <a
                     className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
                  >
                     <img
                        className="h-20 mr-2"
                        src="https://i.postimg.cc/nrsTJywx/donna-logo.png"
                        alt="logo"
                     />
                  </a> */}
                  <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-lg xl:p-0">
                     <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                           {ar ? "انشئ حساب" : "Create an account"}
                        </h1>

                        {emailError.length !== 0 && (
                           <div className="p-4 capitalize mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                              {emailError.map(err => {
                                 return (
                                    err
                                 )
                              })}
                           </div>
                        )}
                        {passwordError.length !== 0 && (
                           <div className="p-4 capitalize mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                              {passwordError.map((err, index) => {
                                 return (
                                    <p key={index}>{err}</p>
                                 )
                              })}
                           </div>
                        )}

                        <form className="space-y-4 md:space-y-6" id="signup_form">
                           <div>
                              <label
                                 htmlFor="first_name"
                                 className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                 {ar ? "الاسم الاول" : "First name"}
                              </label>
                              <input
                                 type="text"
                                 name="first_name"
                                 id="first_name"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                 placeholder={ar ? "الاسم الاول" : "your first name"}
                                 required
                              />
                           </div>
                           <div>
                              <label
                                 htmlFor="last_name"
                                 className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                 {ar ? "الكنية" : "Last Name"}
                              </label>
                              <input
                                 type="text"
                                 name="last_name"
                                 id="last_name"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                 placeholder={ar ? "الكنية" : "your last name"}
                                 required
                              />
                           </div>
                           <div>
                              <label
                                 htmlFor="Semail"
                                 className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                 {ar ? "بريدك الالكتروني" : "Your email"}
                              </label>
                              <input
                                 type="email"
                                 name="Semail"
                                 id="Semail"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                 placeholder="name@company.com"
                                 required
                              />
                           </div>
                           <div>
                              <label
                                 htmlFor="Spassword"
                                 className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                 {ar ? "كلمة المرور" : "Password"}
                              </label>
                              <input
                                 type="password"
                                 name="Spassword"
                                 id="Spassword"
                                 placeholder="••••••••"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                 required
                              />
                           </div>
                           <button
                              type="submit"
                              className="w-full text-white bg-primary-100 hover:bg-primary-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                           >
                              {!loading ? ar ? "انشاء الحساب" : "Create an account" : (
                                 <div role="status" className="text-center mx-auto w-fit">
                                    <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                 </div>
                              )}
                           </button>
                           <p className="text-sm font-light text-gray-500">
                              {ar ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
                              <a
                                 onClick={() => setLog(1)}
                                 className="font-medium text-blue-600 hover:underline cursor-pointer"
                              >
                                 {ar ? "تسجيل الدخول" : "Login here"}
                              </a>
                           </p>
                        </form>
                     </div>
                  </div>
               </div>
            </section>
         )}
         {log == 1 && (
            <section className="bg-gray-50">
               <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  {/* <a
                     className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
                  >
                     <img
                        className="h-20 mr-2"
                        src="https://i.postimg.cc/nrsTJywx/donna-logo.png"
                        alt="logo"
                     />
                  </a> */}
                  <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                     <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                           {ar ? "تسجيل الدخول إلى حسابك" : "Log in to your account"}
                        </h1>
                        {logError && (
                           <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                              Email or Password is not correct. please try again !
                           </div>
                        )}
                        <form className="space-y-4 md:space-y-6" id="login_form">
                           <div>
                              <label
                                 htmlFor="Lemail"
                                 className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                 {ar ? "البريد الالكتروني" : "Your email"}
                              </label>
                              <input
                                 type="email"
                                 name="Lemail"
                                 id="Lemail"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                 placeholder="name@company.com"
                                 required
                              />
                           </div>
                           <div>
                              <label
                                 htmlFor="Lpassword"
                                 className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                 {ar ? "كلمة المرور" : "Password"}
                              </label>
                              <input
                                 type="password"
                                 name="Lpassword"
                                 id="Lpassword"
                                 placeholder="••••••••"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                 required
                              />
                           </div>
                           <div className="flex items-center justify-between">
                              <a
                                 onClick={() => handleForget()}
                                 className="cursor-pointer text-sm font-medium text-blue-600 hover:underline"
                              >
                                 {ar ? "هل نسيت كلمة السر؟" : "Forgot password?"}
                              </a>
                           </div>
                           <button
                              type="submit"
                              className="w-full text-white bg-primary-200 hover:bg-primary-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                           >
                              {/* Log in */}
                              {!loading ? ar ? "تسجيل الدخول" : "Log in" : (
                                 <div role="status" className="text-center mx-auto w-fit">
                                    <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                 </div>
                              )}
                           </button>
                           <p className="text-sm font-light text-gray-500">
                              {ar ? "ليس لديك حساب؟" : "Don’t have an account yet?"}{" "}
                              <a
                                 onClick={() => setLog(2)}
                                 className="font-medium text-blue-600 hover:underline cursor-pointer"
                              >
                                 {ar ? "انشاء حساب" : "Sign up"}
                              </a>
                           </p>
                        </form>
                     </div>
                  </div>
               </div>
            </section>
         )}
         {forget && (
            <section className="bg-gray-50">
               <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  {/* <a
                     className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
                  >
                     <img
                        className="h-20 mr-2"
                        src="https://i.postimg.cc/nrsTJywx/donna-logo.png"
                        alt="logo"
                     />
                  </a> */}
                  <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                     <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                           {ar ? "نسيت كلمه المرور" : "Forget Password"}
                        </h1>
                        <p className="text-sm text-gray-600">
                           {ar ? "سنرسل لك رمزًا في بريدك الإلكتروني للتحقق من حسابك ، ثم يمكنك إعادة تعيين كلمة المرور الخاصة بك" : "we will send you a code in your email to verify your account, then you can reset your password"}
                        </p>
                        <form className="space-y-4 md:space-y-6" id="forgot_form">
                           {resetEmailError && (
                              <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                                 <span className="font-medium">{resetEmailError}</span>
                              </div>
                           )}
                           <div>
                              <label
                                 htmlFor="Femail"
                                 className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                 {ar ? "ادخل البريد الالكتروني" : "Enter your email"}
                              </label>
                              <input
                                 type="email"
                                 name="Femail"
                                 id="Femail"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                 placeholder="name@company.com"
                                 required
                              />
                           </div>
                           <button
                              type="submit"
                              className="w-full text-white bg-primary-200 hover:bg-primary-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                           >
                              {/* Log in */}
                              {!loading ? ar ? "ارسال" : "Send" : (
                                 <div role="status" className="text-center mx-auto w-fit">
                                    <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                 </div>
                              )}
                           </button>
                           <p className="text-sm font-light text-gray-500">
                              <a
                                 onClick={() => { setLog(1); setForget(false) }}
                                 className="font-medium text-blue-600 hover:underline cursor-pointer"
                              >
                                 {ar ? "تسجيل الدخول" : "Log in"}
                              </a>
                              <p className="text-gray-600 inline">{ar ? " او " : " or "}</p>
                              <a
                                 onClick={() => { setLog(2); setForget(false) }}
                                 className="font-medium text-blue-600 hover:underline cursor-pointer"
                              >
                                 {ar ? "انشاء حساب" : "Sign up"}
                              </a>
                           </p>
                        </form>
                     </div>
                  </div>
               </div>
            </section>
         )}
      </div>
   );
}
