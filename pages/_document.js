import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
   return (
      <Html lang="en">
         <Head>
            <link
               rel="stylesheet"
               href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
               integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
               crossOrigin="anonymous"
            />
            {/* <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.3/dist/flowbite.min.css" /> */}
         </Head>
         <body>
            <Main />
            <NextScript />
            <Script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></Script>
         </body>
      </Html>
   );
}