/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

export default function Index() {
   const [blogs, setBlogs] = useState([]);
   const [BlogCategory, setBlogCategory] = useState([]);

   useEffect(() => {
      const queyParam = window.location.search.split("=")[1]
      axios.get(`https://backends.donnachoice.com/api/blog/${queyParam ? queyParam : ""}`).then(res => setBlogs(res.data))
      axios.get("https://backends.donnachoice.com/api/blog_category/").then(res => setBlogCategory(res.data))
      console.log(blogs);
   }, []);
   return (
      <div className="container py-6 grid md:grid-cols-8">
         <aside className="col-span-8 md:col-span-2 py-4 md:p-4 md:border-r md:border-gray-200">
            <h3 className="text-2xl mb-4">Blog</h3>
            <div className="bg-gray-50 p-4 rounded shadow border">
               <h4 className="text-xl mb-2">Top Blogs</h4>
               {blogs
                  .sort((a, b) => a.views < b.views)
                  .map((blog) => {
                     return (
                        <Link key={blog.id} href={`/blog/${blog.slug}`}>
                           <a href="#" className="hover:underline">
                              <p className="mb-4 ml-4 text-gray-500">{blog.name}</p>
                           </a>
                        </Link>
                     );
                  })}
            </div>
            <div className="bg-gray-50 p-4 rounded shadow border mt-6">
               <h4 className="text-xl mb-2">Categories</h4>
               <a href="#" className="hover:underline">
                  <p className="mb-4 ml-4 text-gray-500">All</p>
               </a>
               {BlogCategory.map((cat) => {
                  return (
                     <Link href={`?category=${cat.slug}`} key={cat.id}>
                        <a className="hover:underline">
                           <p className="mb-4 ml-4 text-gray-500">{cat.name}</p>
                        </a>
                     </Link>
                  );
               })}
            </div>
         </aside>
         <div className="h-fit col-span-8 md:col-span-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-6 gap-4">
            {blogs.reverse().map((blog) => {
               return (
                  <div
                     key={blog.id}
                     className="bg-gray-50 rounded-lg border shadow-md"
                  >
                     <div className="i_a_r_v">
                     <img
                        className="rounded-t-lg object-cover"
                        src={blog.img}
                        alt={blog.name}
                     />
                     </div>
                     <div className="p-5">
                        <span className="text-gray-500 text-sm">
                           {blog.created_at.slice(0, 10)}
                        </span>
                        <h5 className="mb-2 text-xl font-bold tracking-tight">
                           {blog.name.length > 20
                              ? blog.name.slice(0, 21) + "..."
                              : blog.name}
                        </h5>
                        <p
                           className="mb-3 font-normal text-gray-700"
                           dangerouslySetInnerHTML={{
                              __html: blog.description.slice(0, 150) + "...",
                           }}
                        ></p>
                        <Link href={`/blog/${blog.slug}`}>
                           <a className="mt-auto w-fit inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-primary-200 rounded-lg hover:bg-primary-300 focus:ring-4 focus:outline-none focus:ring-blue-300">
                              Read more
                           </a>
                        </Link>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
// export const getStaticProps = async () => {
//    const blogsres = await fetch("https://backends.donnachoice.com/api/blog/");
//    let blogs = await blogsres.json();

//    const categoryres = await fetch(
//       "https://backends.donnachoice.com/api/blog_category/"
//    );

//    let category_blogs = await categoryres.json();
//    return {
//       props: {
//          blogs,
//          category_blogs,
//       },
//    };
// };
