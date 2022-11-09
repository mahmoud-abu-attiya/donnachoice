import React from "react";
import { useSelector } from "react-redux";

const DelivaryDetails = () => {
   const ar = useSelector(state => state.langs.value)
   return (
      <form className="bg-gray-50 border rounded-md p-4">
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
                  id="first_name"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder={ar ? "اسم" : "First Name..." }
                  required
               />
            </div>
            <div>
               <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  {ar ? "اللقب" : "Last name*"}
               </label>
               <input
                  type="text"
                  id="last_name"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder={ar ? "اسم" : "Last Name..." }
                  required
               />
            </div>
            <div>
               <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  {ar ? "البريد الالكترونى" : "Email address*"}
               </label>
               <input
                  type="email"
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
                  {ar ? "هاتف بديل" : "Alt Phone*"}
               </label>
               <input
                  type="tel"
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
                  {ar ? "البلد*" : "Country*"}
               </label>
               <select
                  id="countries"
                  required
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
               >
                  <option selected>{ar ? "اختر دولة" : "Choose a country"}</option>
                  <option value="US">{ar ? "قطر" : "Qatar"}</option>
               </select>
            </div>
            <div>
               <label
                  htmlFor="State"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  {ar ? "المدينة" : "City*"}
               </label>
               <input
                  type="text"
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
                  {ar ? "رقم الشارع" : "Street Number*"}
               </label>
               <input
                  type="text"
                  id="Street"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
               />
            </div>
            <div>
               <label
                  htmlFor="zone"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  {ar ? "رقم المنطقة" : "Zone Number*"}
               </label>
               <input
                  type="text"
                  id="zone"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
               />
            </div>
            <div>
               <label
                  htmlFor="Address"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  {ar ? "رقم المبني" : "Building Number"}
               </label>
               <input
                  type="text"
                  id="Address"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder
                  required
               />
            </div>
         </div>
         <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
               {ar ? "ملاحظات" : "Notes"}
            </label>
            <textarea
            id="message"
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
