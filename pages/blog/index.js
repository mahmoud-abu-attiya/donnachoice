import Link from 'next/link';
import React from 'react'

export default function index({ blogs }) {

   function strip_tags(input, allowed) {
      //  discuss at: http://phpjs.org/functions/strip_tags/
      // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // improved by: Luke Godfrey
      // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      //    input by: Pul
      //    input by: Alex
      //    input by: Marc Palau
      //    input by: Brett Zamir (http://brett-zamir.me)
      //    input by: Bobby Drake
      //    input by: Evertjan Garretsen
      // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // bugfixed by: Onno Marsman
      // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // bugfixed by: Eric Nagel
      // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // bugfixed by: Tomasz Wesolowski
      //  revised by: Rafał Kukawski (http://blog.kukawski.pl/)
      //   example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
      //   returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
      //   example 2: strip_tags('<p>Kevin <img loading="lazy" src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
      //   returns 2: '<p>Kevin van Zonneveld</p>'
      //   example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
      //   returns 3: "<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>"
      //   example 4: strip_tags('1 < 5 5 > 1');
      //   returns 4: '1 < 5 5 > 1'
      //   example 5: strip_tags('1 <br/> 1');
      //   returns 5: '1  1'
      //   example 6: strip_tags('1 <br/> 1', '<br>');
      //   returns 6: '1 <br/> 1'
      //   example 7: strip_tags('1 <br/> 1', '<br><br/>');
      //   returns 7: '1 <br/> 1'

      allowed = (((allowed || '') + '')
         .toLowerCase()
         .match(/<[a-z][a-z0-9]*>/g) || [])
         .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
      var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
         commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
      return input.replace(commentsAndPhpTags, '')
         .replace(tags, function ($0, $1) {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
         });
   }
   return (
      <div className='container py-6 grid md:grid-cols-8'>
         <aside className='col-span-8 md:col-span-2 p-4 md:border-r md:border-gray-200'>
            <h3 className='text-2xl mb-4'>Blog</h3>
            <div className="bg-gray-50 p-4 rounded shadow border">
               <h4 className="text-xl mb-2">Top Blogs</h4>
               <a href="#" className='hover:underline'>
                  <p className='mb-4 ml-4 text-gray-500'>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio rerum ad aliquid dicta
                  </p>
               </a>
               <a href="#" className='hover:underline'>
                  <p className='mb-4 ml-4 text-gray-500'>
                     Lorem ipsum dolor sit amet
                  </p>
               </a>
               <a href="#" className='hover:underline'>
                  <p className='mb-4 ml-4 text-gray-500'>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit
                  </p>
               </a>
               <a href="#" className='hover:underline'>
                  <p className='mb-4 ml-4 text-gray-500'>
                     Lorem ipsum dolor
                  </p>
               </a>
            </div>
            <div className="bg-gray-50 p-4 rounded shadow border mt-6">
               <h4 className="text-xl mb-2">Categories</h4>
               <a href="#" className='hover:underline'>
                  <p className='mb-4 ml-4 text-gray-500'>
                     School
                  </p>
               </a>
               <a href="#" className='hover:underline'>
                  <p className='mb-4 ml-4 text-gray-500'>
                     Outdoor
                  </p>
               </a>
               <a href="#" className='hover:underline'>
                  <p className='mb-4 ml-4 text-gray-500'>
                     Fashon
                  </p>
               </a>
            </div>
         </aside>
         {blogs.map((blog) => {
            return (
               <div key={blog.id} className="col-span-8 md:col-span-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-6 gap-4">
                  <div className="max-w-sm bg-gray-50 rounded-lg border shadow-md">
                     <img className="rounded-t-lg" src={blog.img} alt={blog.name} />
                     <div className="p-5">
                        <span className="text-gray-500 text-sm">Sep 15,2022</span>
                        <h5 className="mb-2 text-xl font-bold tracking-tight">{blog.name}</h5>
                        <p className="mb-3 font-normal text-gray-700">
                           {strip_tags(blog.description.slice(0, 150) + "...", []) }
                        </p>
                        <Link href={`/blog/${blog.slug}`}>
                           <a className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-primary/75 focus:ring-4 focus:outline-none focus:ring-blue-300">
                              Read more
                           </a>
                        </Link>
                     </div>
                  </div>
               </div>
            )
         })}
      </div>
   )
}
export const getStaticProps = async () => {
   const res = await fetch('http://3.83.152.24/api/blog/');
   let blogs = await res.json();
   return {
      props: {
         blogs,
      }
   }
}
