import React from 'react'
import Axios from "axios";

const Brand = ({ blog }) => {
   return (
      // <div>{blog && blog.name}</div>
      <div>test blog</div>
   )
}

export default Brand

export const getStaticProps = async ({ params }) => {
   const { data } = await Axios.get(`http://3.83.152.24/api/blog/${params.slug}`);
   const blog = data;
   return {
      props: {
         blog,
      },
   };
};

export const getStaticPaths = async () => {
   const { data } = await Axios.get("http://3.83.152.24/api/blog/");
   const paths = data.map((blogs) => ({ params: { slug: blogs.slug.toString() } }));
   return {
      paths,
      fallback: true,
   };
};