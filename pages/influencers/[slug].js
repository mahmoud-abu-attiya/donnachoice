import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Hero from "../../components/Hero";
import ProductBox from "../../components/ProductBox";

const Influ = () => {
   const [influ, setInflu] = useState();
   const ar = useSelector((state) => state.langs.value);
   const [products, setProducts] = useState();
   const router = useRouter();
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      const influSlug = router.query.slug;
      console.log(influSlug);
      axios
         .get(
            `https://backends.donnachoice.com/api/influencer/?slug=${influSlug}`
         )
         .then((res) => {
            console.log(res.data);
            setInflu(res.data[0]);
            setLoading(false);
         })
         .catch((err) => {
            console.log(err);
         });
      axios
         .get(
            `https://backends.donnachoice.com/api/products/?brand__slug=${influSlug}`
         )
         .then((res) => {
            setProducts(res.data);
            // console.log(res.data);
         });
   }, []);
   if (loading) {
      return <div>loading...</div>;
   }
   return (
      <div dir={ar ? "rtl" : "ltr"}>
         <Hero title={ar ? influ.name_ar : influ.name} not={true} img={influ.img} />
         <div className="container py-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
               {products &&
                  products.map((product) => {
                     return <ProductBox key={product.id} product={product} />;
                  })}
            </div>
         </div>
      </div>
   );
};

export default Influ;
