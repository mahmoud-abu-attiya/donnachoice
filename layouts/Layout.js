import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Loading from './Loading'

const Layout = ({ children }) => {
   return (
      <>
         <Loading />
         <Navbar />
            {children}
         <Footer />
      </>
   )
}

export default Layout