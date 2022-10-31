import React from 'react'
import Axios from "axios";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const Brand = ({ blog }) => {
   const [auth, setAuth] = useState()
   const [commentErr, setCommentErr] = useState(false)
   const handleComment = () => {
      let comment = document.getElementById("comment");
      const myStatus = {
         comment: comment.value,
      }
      if (comment.value == "") {
         setCommentErr(true)
      } else {
         axios.post(`https://backends.donnachoice.com/api/blog/${blog.slug}/comments/`, myStatus, {
            headers: {
               Authorization: `Bearer ${Cookies.get("token")}`,
            },
         }).then(res => {
            console.log(res.data);
            location.reload()
         })
      }
   }
   useEffect(() => {
      console.log(blog);
      setAuth(Cookies.get("auth"))
   }, []);
   return (
      <div className='container mb-8 space-y-8'>
         <nav className="flex col-span-9 bg-gray-50 py-3 px-5 rounded " aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
               <li className="inline-flex items-center">
                  <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                     <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                     Home
                  </a>
               </li>
               <li>
                  <div className="flex items-center">
                     <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                     <span className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2">
                        Blogs
                     </span>
                  </div>
               </li>
               <li aria-current="page">
                  <div className="flex items-center">
                     <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                     <span className="ml-1 capitalize text-sm font-medium text-gray-500 md:ml-2">
                        {blog && blog.name}
                     </span>
                  </div>
               </li>
            </ol>
         </nav>
         <div className="bg-gray-50 p-4 mt-8 rounded-lg  shadow-lg">
            <div className="head flex justify-between items-center text-gray-600">
               <div className="cat text-xl font-bold">
                  <span className="text-sm font-light">Category:</span> {blog && blog.category}
               </div>
               <div className='flex gap-4 text-sm'>
                  <div>{blog && blog.created_at.slice(0, 10)}</div>
                  <div> <i className="fas fa-eye"></i> {blog && blog.views}</div>
               </div>
            </div>
            <hr className="my-8 h-px bg-gray-200 border-0" />
            <div className="sm:px-8 pb-8">
               <img src={blog && blog.img} className="w-full rounded mb-8" alt={blog && blog.name} />
               <h3 className='text-3xl mb-4 font-bold'>{blog && blog.name}</h3>
               {blog && <div className='break-words' dangerouslySetInnerHTML={{ __html: blog.description }}></div>}
            </div>
         </div>
         <div className='grid grid-cols-1 md:grid-cols-6 gap-8'>
            <div className={`${auth ? "md:col-span-4" : "col-span-6"} p-2 md:p-4 bg-gray-50 rounded-lg shadow-lg`}>
               <h3 className='text-xl font-bold mb-4'>Comments</h3>
               {blog.comments != 0 ? blog.comments.map(comment => {
                  return (
                     <div key={comment.id} className="mb-4">
                        <p className='font-bold capitalize'>{comment.user.first_name} {comment.user.last_name}</p>
                        <p key={comment.id} className="text-left text-gray-500">
                           {comment.comment}
                        </p>
                     </div>
                  )
               }) : (
                  <p className='text-left text-gray-500'>No comments in this blog yet.</p>
               )}
            </div>
            {auth && (
               <div className="md:col-span-2 p-2 md:p-4 bg-gray-50 rounded-lg shadow-lg h-fit">
                  <div>
                     <textarea onChange={() => setCommentErr(false)} id="comment" rows={4} 
                     className={`outline-none block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border ${commentErr ? "border-red-700" : "border-gray-300"} focus:border-primary-100`} placeholder="Your comment..." defaultValue={""} />
                     <button onClick={() => handleComment()} id='send_comment' className='py-3 px-5 rounded-md shadow bg-primary-100 mt-4 text-white w-full'>
                        Done
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default Brand

export const getStaticProps = async ({ params }) => {
   const { data } = await Axios.get(`https://backends.donnachoice.com/api/blog/${params.slug}`);
   const blog = data;
   return {
      props: {
         blog,
      },
   };
};

export const getStaticPaths = async () => {
   const { data } = await Axios.get("https://backends.donnachoice.com/api/blog/");
   const paths = data.map((blogs) => ({ params: { slug: blogs.slug.toString() } }));
   return {
      paths,
      fallback: true,
   };
};