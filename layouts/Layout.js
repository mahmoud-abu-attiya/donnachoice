import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Script from 'next/script'
import Loading from './Loading'

const Layout = ({ children }) => {
   return (
      <>
         <Loading />
         <Navbar />
            {children}
         <Footer />
         <Script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></Script>
      </>
   )
}

export default Layout