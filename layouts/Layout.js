import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Layout = ({ children }) => {
   const ar = useSelector(state => state.langs.value)
//    useEffect(() => {
//       if (ar) {
//          const style = document.createElement('style');
//       style.textContent = `
//    body {
//    font-family: 'Almarai', sans-serif;
//    }
// `;
//       document.head.appendChild(style);
//       }
//    }, [ar]);
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