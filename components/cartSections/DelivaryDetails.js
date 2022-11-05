import React from "react";

const DelivaryDetails = () => {
   return (
      <form className="bg-gray-50 border rounded-md p-4">
         <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
               <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  First name*
               </label>
               <input
                  type="text"
                  id="first_name"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="John"
                  required
               />
            </div>
            <div>
               <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  Last name*
               </label>
               <input
                  type="text"
                  id="last_name"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Doe"
                  required
               />
            </div>
            <div>
               <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  Email address*
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
                  Mobile*
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
                  Alt Phone*
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
                  Country*
               </label>
               <select
                  id="countries"
                  required
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
               >
                  <option selected>Choose a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
               </select>
            </div>
            <div>
               <label
                  htmlFor="State"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  State*
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
                  Street*
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
                  Zone*
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
                  Address Line
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
               Notes
            </label>
            <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Leave a note..."
            defaultValue={""}
            />
         </div>
      </form>
   );
};

export default DelivaryDetails;
