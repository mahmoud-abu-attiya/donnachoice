// import { Cookies } from "next/dist/server/web/spec-extension/cookies";
import { Html, Head, Main, NextScript } from "next/document";
// import Script from "next/script";
import { useSelector } from "react-redux";

export default function Document() {
   return (
      <Html lang="en">
         <Head>
            {/* <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.3/dist/flowbite.min.css" /> */}
            {/* <link
               rel="stylesheet"
               href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
               integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
               crossOrigin="anonymous"
            /> */}
            {/* <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.2.0/css/all.css" /> */}
            {/* <link rel="stylesheet" href="https://static.fontawesome.com/css/fontawesome-app.css" /> */}
            {/* <link
               rel="stylesheet"
               href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.7.2/css/all.min.css"
               integrity="sha512-3M00D/rn8n+2ZVXBO9Hib0GKNpkm8MSUU/e2VNthDyBYxKWG+BftNYYcuEjXlyrSO637tidzMBXfE7sQm0INUg=="
               crossorigin="anonymous"
               referrerpolicy="no-referrer"
            /> */}
            <link href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro@4cac1a6/css/all.css" rel="stylesheet" type="text/css" />
         </Head>
         <body>
            <Main />
            <NextScript />
            {/* <Script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></Script> */}
         </body>
      </Html>
   );
}
