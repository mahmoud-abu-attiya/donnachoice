import React from 'react'
import { useSelector } from 'react-redux'

const Confirm = ({ data }) => {
   const ar = useSelector(state => state.langs.value)
   return (
      <div className="col-span-8 lg:col-span-6">
         <div className="bg-gray-50 p-4 border rounded-md text-xl space-y-4">
            <p><span className='font-bold'>{ar ? "الاسم الاول" : "First name"}:</span> {data.first_name}</p>
            <p><span className='font-bold'>{ar ? "الكنية" : "Last name"}:</span> {data.last_name}</p>
            <p><span className='font-bold'>{ar ? "الهاتف" : "Mobile"}:</span> {data.phone}</p>
            <p><span className='font-bold'>{ar ? "البريد الالكتروني" : "Email"}:</span> {data.email}</p>
            <p><span className='font-bold'>{ar ? "هاتف بديل" : "Alt phone"}:</span> {data.first_name}</p>
            <p><span className='font-bold'>{ar ? "الدوله" : "Country"}:</span> {data.country}</p>
            <p><span className='font-bold'>{ar ? "المدينه" : "City"}:</span> {data.city}</p>
            <p><span className='font-bold'>{ar ? "رقم المنطقة" : "Zone number"}:</span> {data.zone_number}</p>
            <p><span className='font-bold'>{ar ? "رقم الشارع" : "Street number"}:</span> {data.street_number}</p>
            <p><span className='font-bold'>{ar ? "رقم المبني" : "Building number"}:</span> {data.building_number}</p>
            <p><span className='font-bold'>{ar ? "ملاحظات" : "Nots"}:</span> {data.notes}</p>
         </div>
      </div>
   )
}

export default Confirm