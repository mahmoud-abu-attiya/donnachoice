/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import InnerHTML from 'dangerously-set-html-content'

const Brand = () => {
   const ar = useSelector(state => state.langs.value)
   const [auth, setAuth] = useState();
   const [commentErr, setCommentErr] = useState(false);
   const [blog, setBlog] = useState();
   const [RE, setRE] = useState(false);
   const router = useRouter();
   const handleComment = () => {
      let comment = document.getElementById("comment");
      const myStatus = {
         comment: comment.value,
      };

      if (comment.value == "") {
         setCommentErr(true);
      } else if (!auth) {
         router.push("/login");
      } else {
         axios
            .post(
               `https://backends.donnachoice.com/api/blog/${blog.slug}/comments/`,
               myStatus,
               {
                  headers: {
                     Authorization: `Bearer ${Cookies.get("token")}`,
                  },
               }
            )
            .then((res) => {
               console.log(res.data);
               setRE(!RE);
               comment.value = ""
            });
      }
   };
   useEffect(() => {
      const slug = window.location.pathname.split("/")[2];
      console.log(slug);
      axios
         .get(`https://backends.donnachoice.com/api/blog/${slug}/`)
         .then((res) => {
            console.log(res.data);
            setBlog(res.data);
         });
      console.log(blog);
      setAuth(Cookies.get("auth"));
   }, [RE]);
   return (
      blog && (
         <div dir={ar ? "rtl" : "ltr"} className="container mb-8 space-y-8">
            {/* <nav
               className="flex col-span-9 bg-gray-50 py-3 px-5 rounded "
               aria-label="Breadcrumb"
            >
               <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                     <Link href="/">
                        <a className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                           <svg
                              className="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                           </svg>
                           Home
                        </a>
                     </Link>
                  </li>
                  <li>
                     <div className="flex items-center">
                        <svg
                           className="w-6 h-6 text-gray-400"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                           />
                        </svg>
                        <Link href={"/blog"}>
                           <a>
                              <span className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2">
                                 Blogs
                              </span>
                           </a>
                        </Link>
                     </div>
                  </li>
                  <li aria-current="page">
                     <div className="flex items-center">
                        <svg
                           className="w-6 h-6 text-gray-400"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                           />
                        </svg>
                        <span className="ml-1 capitalize text-sm font-medium text-gray-500 md:ml-2">
                           {blog.name.length > 10
                              ? blog.name.slice(0, 10) + "..."
                              : blog.name}
                        </span>
                     </div>
                  </li>
               </ol>
            </nav> */}
                     <nav className="flex bg-gray-50 py-3 px-5 rounded mb-8 " aria-label="Breadcrumb">
            <ol className="inline-flex items-center">
               <li className="inline-flex items-center">
                  <Link href="/">
                     <a className="inline-flex gap-2 items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                        {ar ? "الرئيسية" : "Home"}
                     </a>
                  </Link>
               </li>
               <li aria-current="page">
                  <div className="flex items-center gap-2">
                     {/* <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg> */}
                     <i
                        className={`text-gray-400 mx-2 fas ${ar ? "fa-chevron-left" : "fa-chevron-right"
                           }`}
                     ></i>
                     <span className="capitalize text-sm font-medium text-gray-500">
                     {ar ? blog.name_ar.length > 10
                              ? blog.name_ar.slice(0, 10) + "..."
                              : blog.name_ar : blog.name.length > 10
                              ? blog.name.slice(0, 10) + "..."
                              : blog.name}
                     </span>
                  </div>
               </li>
            </ol>
         </nav>
            <div className="bg-gray-50 p-4 mt-8 rounded-lg  shadow-lg">
               <div className="head flex justify-between items-center text-gray-600">
                  <div className="cat text-xl font-bold">
                     <span className="text-sm font-light">{ar ? "الفئة:" : "Category:"}</span>{" "}
                     {ar ? blog.category.name_ar : blog.category.name}
                  </div>
                  <div className="flex gap-4 text-sm">
                     <div>{blog.created_at.slice(0, 10)}</div>
                     <div>
                        {" "}
                        <i className="fas fa-eye"></i> {blog.views}
                     </div>
                  </div>
               </div>
               <hr className="my-8 h-px bg-gray-200 border-0" />
               <div className="sm:px-8 pb-8">
                  <img
                     src={blog.img}
                     className="w-full rounded mb-8"
                     alt={blog.name}
                  />
                  <h3 className="text-3xl mb-4 font-bold">{ar ? blog.name_ar :blog.name}</h3>
                  {
                     <div
                        dir="ltr"
                        className="break-words"
                        dangerouslySetInnerHTML={{ __html: blog.description }}
                     ></div>
                     
                  }
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
               <div
                  className="md:col-span-4 col-span-6
                  p-2 md:p-4 bg-gray-50 rounded-lg shadow-lg"
               >
                  <h3 className="text-xl font-bold mb-4">{ar ? "تعليقات" :"Comments"}</h3>
                  {blog.comments != 0 ? (
                     blog.comments.map((comment) => {
                        return (
                           <div key={comment.id} className="mb-4">
                              <p className="font-bold capitalize">
                                 {comment.user.first_name} {comment.user.last_name}
                              </p>
                              <p key={comment.id} className="text-gray-500">
                                 {comment.comment}
                              </p>
                           </div>
                        );
                     })
                  ) : (
                     <p className="text-left text-gray-500">
                        {ar ? "لا توجد تعليقات في هذه المدونة حتى الآن.":"No comments in this blog yet."}
                     </p>
                  )}
               </div>
               <div className="col-span-6 md:col-span-2 p-2 md:p-4 bg-gray-50 rounded-lg shadow-lg h-fit">
                  <div>
                     <textarea
                        onChange={() => setCommentErr(false)}
                        id="comment"
                        rows={4}
                        className={`outline-none block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border ${commentErr ? "border-red-700" : "border-gray-300"
                           } focus:border-primary-100`}
                        placeholder={ar ? "اترك تعليقك..." :"Leave your comment..."}
                        defaultValue={""}
                     />
                     <button
                        onClick={() => handleComment()}
                        id="send_comment"
                        className="py-3 px-5 rounded-md shadow bg-primary-100 mt-4 text-white w-full"
                     >
                        {ar ? "تعليق" :"Done"}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )
   );
};

export default Brand;

// export const getStaticProps = async ({ params }) => {
//    const { data } = await Axios.get(`https://backends.donnachoice.com/api/blog/${params.slug}`);
//    const blog = data;
//    return {
//       props: {
//          blog,
//       },
//    };
// };

// export const getStaticPaths = async () => {
//    const { data } = await Axios.get("https://backends.donnachoice.com/api/blog/");
//    const paths = data.map((blogs) => ({ params: { slug: blogs.slug.toString() } }));
//    return {
//       paths,
//       fallback: true,
//    };
// };
