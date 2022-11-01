import React, { useEffect } from 'react'
import Category from '../../components/Category'
import Hero from "../../components/Hero"

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
	useEffect(()=>{
		console.log(categories);
	},[categories])
	return (
		<div>
			<Hero title="categories" />
			<div className="container">
				<div className="grid grid-cols-1 gap-8 md:gap-10 py-8">
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