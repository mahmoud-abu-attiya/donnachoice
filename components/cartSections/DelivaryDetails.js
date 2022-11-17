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
   const [phoneCode, setPhoneCode] = useState()
   const [country, setCountry] = useState()
   const [fastD, setFastD] = useState(true)
   const ar = useSelector((state) => state.langs.value);
   const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));
   const [delivaryDetails, setdelivaryDetails] = useState(
      JSON.parse(localStorage.getItem("delivaryDetails"))
   );
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
         phone: phoneCode + phone.value,
         alt_phone: alt_phone.value,
         email: email.value,
         country: country,
         city: city.value,
         zone_number: zone_number.value,
         building_number: building_number.value,
         street_number: street_number.value,
         notes: notes.value,
         fast_delivary: fastD,
      };
      props.callback(USER_INFO);
   };
   const handlePhoneCode = () => {
      let e = document.querySelector("select");
      let value = e.options[e.selectedIndex].value;
      var text = e.options[e.selectedIndex].text;
      setPhoneCode(value);
      setCountry(text)
      // setTimeout(() => {
         
      // }, 1000);
   }
   useEffect(() => {
      setValues();
      let delivaryinputs = document.querySelectorAll("#delivaryform input");
      delivaryinputs.forEach((inp) => {
         inp.oninput = () => {
            setValues();
         };
      });
      document.querySelector("#delivaryform textarea").oninput = () => setValues();

      handlePhoneCode()
      // console.log(phoneCode)
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
                  defaultValue={delivaryDetails?.first_name}
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
                  defaultValue={delivaryDetails?.last_name}
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
                  defaultValue={delivaryDetails?.email}
                  id="email"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@info.com"
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
                  <option selected value="971">
                     {ar ? "الإمارات العربية المتحدة" : "United Arab Emirates"}
                  </option>
                  <option selected value="973">
                     {ar ? "مملكة البحرين" : "Kingdom of Bahrain"}
                  </option>
                  <option selected value="968">
                     {ar ? "سلطنة عمان" : "Sultanate of Oman"}
                  </option>
                  <option selected value="966">
                     {ar ? "المملكة العربية السعودية" : "The Kingdom of Saudi Arabia"}
                  </option>
                  <option selected value="965">
                     {ar ? "الكويت" : "Kuwait"}
                  </option>
               </select>
            </div>
            <div>
               {/* <label
                  htmlFor="Mobile"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  {ar ? "التليفون المحمول*" : "Mobile*"}
               </label>
               <input
                  type="tel"
                  id="Mobile"
                  defaultValue={delivaryDetails?.phone}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="123-45-678"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
               /> */}
               <label
                  htmlFor="Mobile"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  {ar ? "التليفون المحمول*" : "Mobile*"}
               </label>
               <div className="flex">
                  <span className={`inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border ${ar ? "border-l-0 rounded-r-md" : "border-r-0 rounded-l-md"} border-gray-300`}>
                     +{phoneCode}
                  </span>
                  <input
                     defaultValue={delivaryDetails?.phone}
                     type="number"
                     id="Mobile"
                     className={`rounded-none ${ar ? "rounded-l-lg" : "rounded-r-lg"} bg-white border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5`}
                     placeholder="123-45-678"
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
                  type="tel"
                  defaultValue={delivaryDetails?.alt_phone}
                  id="alt_phone"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="123-45-678"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
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
                  defaultValue={delivaryDetails?.city}
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
                  defaultValue={delivaryDetails?.street_number}
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
                  defaultValue={delivaryDetails?.zone_number}
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
                  defaultValue={delivaryDetails?.building_number}
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
         <input type="checkbox" onChange={() => setFastD(!fastD)} defaultChecked name="fastDelivary" id="fastDelivary" />
      <label htmlFor="fastDelivary">{ar ? "توصيل سريع +15 ريال" : "Fast Delivary +15 QR"}</label>
         </div>
      </form>
   );
};

export default DelivaryDetails;
