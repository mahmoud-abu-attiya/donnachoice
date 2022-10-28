import Image from "next/image";
import React from "react";
import logo from "../public/images/logo.png";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
   const [log, setLog] = useState(false)
   const [loading, setLoading] = useState(false)
   const [emailError, setEmailError] = useState([])
   const [passwordError, setPasswordError] = useState([])
   const [logError, setLogError] = useState(false)
   useEffect(() => {
      let loginForm = document.getElementById("login_form")
      let signupForm = document.getElementById("signup_form")

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
               Cookies.set("token", res.data.access)
               console.log(res.data);
            }).catch(err => {
               setLoading(false)
               console.log(err);
               console.log(err.response);
               setLogError(true)
            })
      }

      const handleSignup = () => {
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
            wishlist: [],
         }

         axios.post(
            "https://backends.donnachoice.com/api/users/signup/",
            myStatus
         )
            .then(res => {
               console.log(res.data);
               Cookies.set("token", res.data.access)
            }).catch(err => {
               setLoading(false)
               let res = err.response.data
               console.log(res);
               if (res.hasOwnProperty("email")) {
                  console.log(res.email);
                  setEmailError(res.email);
               }
               if (res.hasOwnProperty("password")) {
                  console.log(res.password);
                  setPasswordError(res.password);
               }
            })
         console.log(myStatus);
      }

      if (log) {
         signupForm.onsubmit = (e) => {
            e.preventDefault();
            handleSignup()
         }
      } else {
         loginForm.onsubmit = (e) => {
            e.preventDefault();
            handleLogin()
         }
      }
   }, [log]);
   return (
      <div>
         {log ? (
            <section className="bg-gray-50">
               <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                  <a
                     className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                  >
                     <img
                        className="h-20 mr-2"
                        src="https://donnachoice.com/wp-content/uploads/2022/06/donnachoice-4.png"
                        alt="logo"
                     />
                  </a>
                  <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0">
                     <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                           Create an account
                        </h1>

                        {emailError.length !== 0 && (
                           <div className="p-4 capitalize mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                              {emailError.map(err => {
                                 return(
                                    err
                                 )
                              })}
                           </div>
                        )}
                        {passwordError.length !== 0 && (
                           <div className="p-4 capitalize mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                              {passwordError.map((err, index) => {
                                 return(
                                    <p key={index}>{err}</p>
                                 )
                              })}
                           </div>
                        )}

                        <form className="space-y-4 md:space-y-6" id="signup_form">
                           <div>
                              <label
                                 htmlFor="first_name"
                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                 First name
                              </label>
                              <input
                                 type="text"
                                 name="first_name"
                                 id="first_name"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                 placeholder="your first name"
                                 required
                              />
                           </div>
                           <div>
                              <label
                                 htmlFor="last_name"
                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                 Last Name
                              </label>
                              <input
                                 type="text"
                                 name="last_name"
                                 id="last_name"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                 placeholder="your last name"
                                 required
                              />
                           </div>
                           <div>
                              <label
                                 htmlFor="Semail"
                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                 Your email
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
                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                 Password
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
                              className="w-full text-white bg-primary hover:bg-primary/75 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                           >
                              {!loading ? "Create an account" : (
                                 <div role="status" className="text-center mx-auto w-fit">
                                    <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                 </div>
                              )}
                           </button>
                           <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                              Already have an account?{" "}
                              <a
                                 onClick={() => setLog(!log)}
                                 className="font-medium text-blue-600 hover:underline cursor-pointer"
                              >
                                 Login here
                              </a>
                           </p>
                        </form>
                     </div>
                  </div>
               </div>
            </section>
         ) : (
            <section className="bg-gray-50 dark:bg-gray-900">
               <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <a
                     className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                  >
                     <img
                        className="h-20 mr-2"
                        src="https://donnachoice.com/wp-content/uploads/2022/06/donnachoice-4.png"
                        alt="logo"
                     />
                  </a>
                  <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                     <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                           Log in to your account
                        </h1>
                        {logError && (
                           <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                              Email or Password is not correct. please try again !
                           </div>
                        )}
                        <form className="space-y-4 md:space-y-6" id="login_form">
                           <div>
                              <label
                                 htmlFor="Lemail"
                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                 Your email
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
                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                 Password
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
                                 href="#"
                                 className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                              >
                                 Forgot password?
                              </a>
                           </div>
                           <button
                              type="submit"
                              className="w-full text-white bg-primary hover:bg-primary/75 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                           >
                              {/* Log in */}
                              {!loading ? "Log in" : (
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
                              Don’t have an account yet?{" "}
                              <a
                                 onClick={() => setLog(!log)}
                                 className="font-medium text-blue-600 hover:underline cursor-pointer"
                              >
                                 Sign up
                              </a>
                           </p>
                        </form>
                     </div>
                  </div>
               </div>
            </section>
         )
         }
      </div>
   );
}
