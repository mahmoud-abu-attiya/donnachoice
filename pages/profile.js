/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import PorfileP from "../components/placeholder/PorfileP";
import swal from "sweetalert";

export default function Profile() {
   const ar = useSelector((state) => state.langs.value);
   const [loading, setLoading] = useState(true);
   const router = useRouter();
   const [user, setUser] = useState("");
   const [orderHistory, setOrderHistory] = useState([]);
   const [edit, setEdit] = useState(false);
   const wishlistIndicator = useSelector(
      (state) => state.wishlistIndicator.count
   );
   const cartIndicator = useSelector((state) => state.cartIndicator.count);
   const compareIndicator = useSelector(
      (state) => state.compareIndicator.count
   );
   const handleLogout = () => {
      Cookies.remove("token");
      Cookies.remove("auth");
      // Cookies.remove("")
      localStorage.removeItem("user");
      location.reload();
   };
   const opencart = (e) => {
      e.preventDefault();
      const token = Cookies.get("token");
      window.location.href = `https://backends.donnachoice.com/cart/login_with_token?token=${token}&lang=${ar ? "ar" : "en"}`;
   }
   useEffect(() => {
      if (!Cookies.get("auth")) {
         router.push("/login");
         console.log("not auth");
      } else {
         axios
            .get("https://backends.donnachoice.com/api/users/profile/", {
               headers: {
                  Authorization: `Bearer ${Cookies.get("token")}`,
               },
            })
            .then((res) => {
               setUser(res.data);
               console.log(res.data);
               setLoading(false);
            })
            .catch((err) => {
               setLoading(false);
               console.log(err);
            });

         axios
            .get("https://backends.donnachoice.com/api/order_history/", {
               headers: {
                  Authorization: `Bearer ${Cookies.get("token")}`,
               },
            })
            .then((res) => {
               console.log(res.data);
               setOrderHistory(res.data);
            });
      }
   }, []);
   const editProfile = (e) => {
      e.preventDefault();
      const formEl = new FormData(e.target);
      const data = Object.fromEntries(formEl);
      console.log(data);
      axios
         .patch("https://backends.donnachoice.com/api/users/profile/", data, {
            headers: {
               Authorization: `Bearer ${Cookies.get("token")}`,
            },
         })
         .then((res) => {
            console.log(res.data);
            setUser(res.data);
            setEdit(false);
            Cookies.set("token", res.data.access);
            swal({
               title: ar ? "تم التعديل بنجاح" : "Updated Successfully",
               icon: "success",
               button: ar ? "موافق" : "Ok",
            });
         })
         .catch((err) => {
            console.log(err);
            let errors = ""; 
            err.response.data.email?.map((e) => 
            {
               errors = errors + " " + (e)
            });
            err.response.data.first_name?.map((e) =>
            {
               errors = errors + " " + (e)
            });
            err.response.data.last_name?.map((e) =>
            {
               errors = errors + " " + (e)
            });
            err.response.data.phone?.map((e) =>
            {
               errors = errors + " " + (e)
            });

            console.log(errors);
            swal({
               title: ar ? "حدث خطأ" : "Error!",
               icon: "error",
               text: errors,
               button: ar ? "موافق" : "Ok",
            });
         });
   };

   if (loading) {
      return <PorfileP />;
   }
   return (
      <div
         dir={ar ? "rtl" : "ltr"}
         className="container grid grid-cols-9 gap-8 py-8"
      >
         <nav
            className="flex col-span-9 bg-gray-50 py-3 px-5 rounded "
            aria-label="Breadcrumb"
         >
            <ol className="inline-flex items-center">
               <li className="inline-flex items-center">
                  <Link href="/">
                     <a className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <svg
                           className={ar ? "w-4 h-4 ml-2" : "w-4 h-4 mr-2"}
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
               <li>
                  <div className="flex items-center">
                     {/* <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg> */}
                     <i
                        className={`text-gray-400 mx-2 fas ${
                           ar ? "fa-chevron-left" : "fa-chevron-right"
                        }`}
                     ></i>
                     <span className="text-sm font-medium text-gray-700 hover:text-gray-900">
                        {ar ? "الملف الشخصي" : "Profile"}
                     </span>
                  </div>
               </li>
               <li aria-current="page">
                  <div className="flex items-center">
                     {/* <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg> */}
                     <i
                        className={`text-gray-400 mx-2 fas ${
                           ar ? "fa-chevron-left" : "fa-chevron-right"
                        }`}
                     ></i>

                     <span className="capitalize text-sm font-medium text-gray-500">
                        {user.first_name}
                     </span>
                  </div>
               </li>
            </ol>
         </nav>
         <aside className="col-span-9 lg:col-span-2" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded-lg border">
               <ul className="lg:space-y-2 flex justify-between items-center lg:items-stretch lg:flex-col">
                  <li className="hidden sm:block">
                     <a
                        href="#"
                        className="flex items-center gap-3 p-2 text-base font-normal text-gray-900 rounded-lg bg-gray-100"
                     >
                        <i className="fad fa-user text-gray-500 text-xl hidden sm:block"></i>
                        <span>{ar ? "المستخدم" : "User"}</span>
                     </a>
                  </li>
                  <li>
                     <Link href="/wish-list">
                        <a className="flex items-center gap-2 p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                           <i className="fad fa-heart text-gray-500 text-xl hidden sm:block"></i>
                           <span className="flex-1 whitespace-nowrap">
                              {ar ? "الرغبات" : "Wish list"}
                           </span>
                           <span className="inline-flex justify-center items-center p-3 md:ml-3 w-3 h-3 text-sm font-medium text-primary-100 bg-primary-300 rounded-full">
                              {wishlistIndicator}
                           </span>
                        </a>
                     </Link>
                  </li>
                  <li>
                     {/* <Link href={"/cart"}> */}
                        <a onClick={(e) => opencart(e)} href={"/cart"} className="flex items-center gap-2 p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                           <i className="fad fa-shopping-cart text-gray-500 text-xl hidden sm:block"></i>
                           <span className="flex-1 whitespace-nowrap">
                              {ar ? "العربة" : "Cart"}
                           </span>
                           <span className="inline-flex justify-center items-center p-3 md:ml-3 w-3 h-3 text-sm font-medium text-primary-100 bg-primary-300 rounded-full">
                              {cartIndicator}
                           </span>
                        </a>
                     {/* </Link> */}
                  </li>
                  <li>
                     <Link href={"/compare"}>
                        <a className="flex items-center gap-2 p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                           {/* <i className="fad fa-random"></i> */}
                           <i className="fad fa-random text-gray-500 text-xl hidden sm:block"></i>
                           <span className="flex-1 whitespace-nowrap">
                              {ar ? "قارن" : "Compare"}
                           </span>
                           <span className="inline-flex justify-center items-center p-3 md:ml-3 w-3 h-3 text-sm font-medium text-primary-100 bg-primary-300 rounded-full">
                              {compareIndicator}
                           </span>
                        </a>
                     </Link>
                  </li>
               </ul>
               <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200">
                  <li>
                     <button
                        onClick={() => handleLogout()}
                        className="flex w-full gap-2 items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100"
                     >
                        <i className="fad fa-door-open text-gray-500 text-xl"></i>
                        <span>{ar ? "تسجيل الخروج" : "Logout"}</span>
                     </button>
                  </li>
               </ul>
            </div>
         </aside>
         <div className="col-span-9 lg:col-span-7 space-y-4">
            <div className="head capitalize flex gap-4 items-center text-xl md:text-3xl">
               <i className="fad fa-user-circle text-gray-600 text-5xl"></i>
               {user.first_name + " " + user.last_name}
               <button
                  onClick={() => setEdit(true)}
                  className="justify-self-end ml-auto bg-gray-200 text-gray-700 rounded-full w-10 h-10 text-sm border border-gray-300 shadow"
               >
                  <i className="fad fa-edit"></i>
               </button>
            </div>
            {!edit ? (
               <div className="info grid grid-cols-8 bg-gray-50 rounded-md border max-w-full overflow-x-auto">
                  <div className="col-span-3 md:col-span-2">
                     <div className="py-2 px-4 border-b">
                        {ar ? "الاسم الاول" : "First Name"}
                     </div>
                     <div className="py-2 px-4 border-b">
                        {ar ? "الكنية" : "Last Name"}
                     </div>
                     <div className="py-2 px-4 border-b">
                        {ar ? "البريد الإلكتروني" : "Email"}
                     </div>
                     {/* <div className="py-2 px-4 border-b">
                     {ar ? "الهاتف" : "Phone"}
                  </div> */}
                     <div className="py-2 px-4 ">{ar ? "الهاتف" : "Phone"}</div>
                  </div>
                  <div className="text-gray-700 col-span-5 md:col-span-6">
                     <div
                        className={`py-2 px-4 capitalize ${
                           ar ? "border-r" : "border-l"
                        } border-b`}
                     >
                        {user.first_name}
                     </div>
                     <div
                        className={`py-2 px-4 capitalize ${
                           ar ? "border-r" : "border-l"
                        } border-b`}
                     >
                        {user.last_name}
                     </div>
                     <div
                        className={`py-2 px-4 ${
                           ar ? "border-r" : "border-l"
                        } border-b`}
                     >
                        {user.email}
                     </div>
                     {/* <div
                     className={`py-2 px-4 ${ar ? "border-r" : "border-l"} border-b`}
                  >
                     {user.phone ? user.phone : "no phone number yet."}
                  </div> */}
                     <div
                        className={`py-2 px-4 ${ar ? "border-r" : "border-l"}`}
                     >
                        {user.phone ? user.phone : "no phone yet."}
                     </div>
                  </div>
               </div>
            ) : (
               <form
                  onSubmit={editProfile}
                  className="info grid grid-cols-8 bg-gray-50 rounded-md border max-w-full overflow-x-auto"
               >
                  <div className="col-span-3 md:col-span-2">
                     <div className="py-2 px-4 border-b">
                        {ar ? "الاسم الاول" : "First Name"}
                     </div>
                     <div className="py-2 px-4 border-b">
                        {ar ? "الكنية" : "Last Name"}
                     </div>
                     <div className="py-2 px-4 border-b">
                        {ar ? "البريد الإلكتروني" : "Email"}
                     </div>
                     <div className="py-2 px-4 border-b ">
                        {ar ? "الهاتف" : "Phone"}
                     </div>
                  </div>
                  <div className="text-gray-700 col-span-5 md:col-span-6">
                     <div
                        className={`py-1 px-4 capitalize ${
                           ar ? "border-r" : "border-l"
                        } border-b`}
                     >
                        {/* {user.first_name} */}
                        <input
                           type="text"
                           name="first_name"
                           defaultValue={user.first_name}
                           // onChange={handleChange}
                           className="py-1 px-2 w-full bg-white rounded focus:outline-none"
                           placeholder="First Name"
                        />
                     </div>
                     <div
                        className={`py-1 px-4 capitalize ${
                           ar ? "border-r" : "border-l"
                        } border-b`}
                     >
                        {/* {user.last_name} */}
                        <input
                           type="text"
                           name="last_name"
                           defaultValue={user.last_name}
                           // onChange={handleChange}
                           className="py-1 px-2 w-full bg-white rounded focus:outline-none"
                           placeholder="Last Name"
                        />
                     </div>
                     <div
                        className={`py-1 px-4 ${
                           ar ? "border-r" : "border-l"
                        } border-b`}
                     >
                        {/* {user.email} */}
                        <input
                           type="text"
                           name="email"
                           defaultValue={user.email}
                           // onChange={handleChange}
                           className="py-1 px-2 w-full bg-white rounded focus:outline-none"
                           placeholder="Email"
                        />
                     </div>
                     <div
                        className={`py-1 px-4 border-b ${
                           ar ? "border-r" : "border-l"
                        }`}
                     >
                        {/* {user.phone ? user.phone : "no phone yet."} */}
                        <input
                           type="number"
                           onInput={(e) => {e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0,8)}}
                           maxlength="8"
                           name="phone"
                           defaultValue={user.phone}
                           className="py-1 px-2 w-full bg-white rounded focus:outline-none"
                           placeholder="Phone"
                           required
                        />
                     </div>
                  </div>
                  <div className="col-span-12 btns flex p-4 gap-4 justify-center items-center">
                     <button
                        type="submit"
                        className="py-2 px-4 bg-primary-100 text-white rounded-md"
                     >
                        {ar ? "حفظ" : "Save"}
                     </button>
                     <button
                        onClick={() => setEdit(false)}
                        type="button"
                        className="py-2 px-4 bg-gray-500 text-white rounded-md"
                     >
                        {ar ? "إلغاء" : "Cancel"}
                     </button>
                  </div>
               </form>
            )}
            <div className="space-y-4">
               <h4 className="text-xl font-bold">
                  {ar ? "تاريخ الطلب" : "Order history"}
               </h4>
               {/* */}
               {orderHistory.length == 0 ? (
                  <div className="bg-gray-50 rounded-md border p-8">
                     <p className="text-2xl font-bold text-center">
                        {ar ? "لا توجد طلبات بعد." : "There is no orders yet."}
                     </p>
                     <Link href={"/products"}>
                        <a>
                           <div className="w-full grow max-w-[200px] transition hover:shadow-md hover:bg-primary-100/75 text-center bg-primary-100 text-white rounded py-3 px-5 mx-auto cursor-pointer my-8">
                              {ar ? "ابدأ التسوق" : "Start Shopping"}
                           </div>
                        </a>
                     </Link>
                  </div>
               ) : (
                  <div className="overflow-x-auto relative shadow-md sm:rounded-lg border">
                     <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                           <tr>
                              <th scope="col" className="py-3 px-6">
                                 {ar ? "العناصر" : "Items"}
                              </th>
                              <th scope="col" className="py-3 px-6">
                                 {ar ? "التاريخ" : "Date"}
                              </th>
                              <th scope="col" className="py-3 px-6">
                                 {ar ? "الدفع" : "Total Payment"}
                              </th>
                              <th scope="col" className="py-3 px-6"></th>
                           </tr>
                        </thead>
                        <tbody>
                           {orderHistory.map((order, index) => {
                              return (
                                 <tr className="bg-white border-b" key={index}>
                                    <th
                                       scope="row"
                                       className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                       {order.items?.slice(0, 2).map((item) => {
                                          return (
                                             <>
                                                <p key={item.id}>
                                                   {ar
                                                      ? item.option.product
                                                           .name_ar
                                                      : item.option.product
                                                           .name}
                                                </p>
                                             </>
                                          );
                                       })}
                                       {order.items?.length > 2 && (
                                          <p className="font-bold underline">
                                             +{order.items.length - 2}
                                          </p>
                                       )}
                                       {/* <p>Apple MacBook Pro 17</p>
                                       <p>item</p>
                                       <p className="font-bold underline">+3</p> */}
                                    </th>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                       {order.created.slice(0, 10)}
                                    </td>
                                    <td className="py-4 px-6">
                                       {ar ? "ريال" : "QR"} {order.total}
                                    </td>
                                    <td className="py-4 px-6">
                                       <Link href={`/orders/${order.id}`}>
                                          <a className="font-medium text-white text-sm py-1 px-2 bg-primary-100 w-full text-center rounded">
                                             {ar ? "عرض" : "View"}
                                          </a>
                                       </Link>
                                       {/* <a href="#" className="font-medium text-white text-sm py-1 px-2 bg-primary-100 text-center rounded">Reorder</a>
                              <Link href={"/orders/1"}>
                                 <a className="font-medium text-white text-sm py-1 px-2 bg-primary-100 w-full text-center rounded">Review</a>
                              </Link> */}
                                       {/* <a href="#" className="font-medium text-white text-sm py-1 px-2 bg-primary-100 text-center rounded">Review</a> */}
                                    </td>
                                 </tr>
                              );
                           })}
                        </tbody>
                     </table>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
