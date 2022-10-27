import React from 'react'
import Axios from "axios";

const Brand = ({ blog }) => {
   return (
      <div>{blog && blog.name}</div>
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