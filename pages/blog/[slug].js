import React from 'react'
import Axios from "axios";

const Brand = ({ blog }) => {
   console.log(blog)
   return (
      <div>
         <h3 className='text-xl font-bold'>{blog && blog.name}</h3>
         {blog && <div dangerouslySetInnerHTML={{ __html: blog.description }}></div>}
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