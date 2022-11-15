import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// export const getStaticProps = () => {
//    const user = {}
//    if (Cookies.get("auth")) {
//       user = JSON.parse(localStorage.getItem("user"))
//    }
//    return user
// }

const DelivaryDetails = (props) => {
   const ar = useSelector(state => state.langs.value)
   const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));
   const setValues = () => {
      let first_name = document.getElementById("first_name"),
         last_name = document.getElementById("last_name"),
         phone = document.getElementById("Mobile"),
         alt_phone = document.getElementById("alt_phone"),
         email = document.getElementById("email"),
         city = document.getElementById("State"),
         zone_number = document.getElementById("zone"),
         building_number = document.getElementById("Address"),
         street_number = document.getElementById("Street"),
         notes = document.getElementById("notes");

      const USER_INFO = {
         first_name: first_name.value,
         last_name: last_name.value,
         phone: phone.value,
         alt_phone: alt_phone.value,
         email: email.value,
         country: "Qatar",
         city: city.value,
         zone_number: zone_number.value,
         building_number: building_number.value,
         street_number: street_number.value,
         notes: notes.value
      }
      props.callback(USER_INFO)
   }
   useEffect(() => {
      let delivaryinputs = document.querySelectorAll("#delivaryform input")
      delivaryinputs.forEach(inp => {
         inp.oninput = () => {
            setValues()
         }
      })
      document.querySelector("#delivaryform textarea").oninput = () => setValues()
   }, []);
   return (
      <form className="bg-gray-50 border rounded-md p-4" id="delivaryform">
         <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
               <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  {ar ? "الاسم الاول*" : "First name*"}
               </label>
               <input
                  type="text"
                  defaultValue={user?.first_name}
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
                  defaultValue={user?.last_name}
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
                  defaultValue={user?.email}
                  id="email"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@info.com"
                  required
               />
            </div>
            <div>
               <label
                  htmlFor="Mobile"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  {ar ? "التليفون المحمول*" : "Mobile*"}
               </label>
               <input
                  type="tel"
                  id="Mobile"
                  defaultValue={user?.phone}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="123-45-678"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
               />
            </div>
            <div>
               <label
                  htmlFor="alt_phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  {ar ? "هاتف بديل" : "Alt Phone"}
               </label>
               <input
                  type="tel"
                  defaultValue={user?.alt_phone}
                  id="alt_phone"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="123-45-678"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
               />
            </div>
            <div>
               <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  {ar ? "البلد" : "Country"}
               </label>
               <select
                  id="countries"
                  required
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
               >
                  {/* <option value="">{ar ? "اختر دولة" : "Choose a country"}</option> */}
                  <option selected value="US">{ar ? "قطر" : "Qatar"}</option>
               </select>
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
                  defaultValue={user?.city}
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
                  type="text"
                  id="Street"
                  defaultValue={user?.street_number}
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
                  type="text"
                  id="zone"
                  defaultValue={user?.zone_number}
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
                  type="text"
                  defaultValue={user?.building_number}
                  id="Address"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder
                  required
               />
            </div>
         </div>
         <div>
            <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900">
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
      </form>
   );
};

export default DelivaryDetails;
