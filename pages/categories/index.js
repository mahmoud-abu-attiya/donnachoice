import React, { useEffect } from 'react'
import Category from '../../components/Category'
import Hero from "../../components/Hero"
import { useSelector } from 'react-redux'

export const getStaticProps = async () => {
   const res = await fetch('https://backends.donnachoice.com/api/categories/');
   let categories = await res.json();
   return {
      props: {
         categories,
      }
   }
}

export default function Categories({ categories }) {
	const ar = useSelector(state => state.langs.value)
	// useEffect(()=>{
	// 	console.log(categories);
	// },[categories])
	return (
		<div>
			<Hero title={ar ? "الفئات" : "categories"} />
			<div className="container" >
				<div className="grid grid-cols-1 gap-12 mb-10 md:gap-24 py-8">
					{categories && categories.map((products, index) => {
						return(
							<Category key={index} products={products} />
						)
					})}
				</div>
			</div>
		</div>
	)
}