import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Script from 'next/script'

const Layout = ({ children }) => {
   return (
      <>
         <Navbar />
         {children}
         <Footer />

      </>
   )
}

export default Layout