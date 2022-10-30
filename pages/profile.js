import React from 'react'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Profile() {
   const router = useRouter();
   useEffect(() => {
      if (!Cookies.get("auth")) {
         router.push("/login")
         console.log("not auth");
      }
   }, []);
   return (
      <div>profile</div>
   )
}
