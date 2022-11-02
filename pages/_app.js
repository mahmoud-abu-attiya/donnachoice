import '../styles/globals.css'
import Layout from '../layouts/Layout'
import { store } from "../store"
import { Provider } from 'react-redux'
// import { useEffect } from 'react';
// import Cookies from 'js-cookie';

function MyApp({ Component, pageProps }) {
//   useEffect(() => {
//     if (Cookies.get("ar") == undefined) {
//        console.log(Cookies.get("ar"));
//        Cookies.set("ar", false)
//     }
//  }, []);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
