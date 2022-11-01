import Link from 'next/link'
import React from 'react'
import Subnav from '../components/Subnav'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Nav = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    const closenav = () => {
      setToggle(false)
    }
    router.events.on("routeChangeComplete", closenav);
    router.events.on("routeChangeError", closenav);
    return () => {
      router.events.off("routeChangeComplete", closenav);
      router.events.off("routeChangeError", closenav);
    }
  }, []);
  return (
    <header className="">
      <Subnav />
      <nav className="bg-white px-2 sm:px-4">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link href={"/"}>
            <a className="flex items-center">
              <img src="https://i.postimg.cc/nrsTJywx/donna-logo.png" className="mr-3 h-14 sm:h-24" alt="Flowbite Logo" />
            </a>
          </Link>
          <button onClick={() => setToggle(!toggle)} type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
          </button>
          <div className={`${!toggle && "hidden"} w-full md:block md:w-auto`} id="navbar_default">
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent">
              <li>
                <Link href={"/"}>
                  <a className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:text-primary-200 md:p-0">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/categories"}>
                  <a className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:text-primary-200 md:p-0">
                    Categories
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/brands"}>
                  <a className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:text-primary-200 md:p-0">
                    Brands
                  </a>
                </Link>
              </li>
              {/* <li>
              <Link href={"/products"}>
                <a className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:text-primary-200 md:p-0">
                  Products
                  </a>
              </Link>
            </li> */}
              <li>
                <Link href={"/blog"}>
                  <a className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:text-primary-200 md:p-0">
                    Blog
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Nav
