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
		console.log(categories.brands_sections);
		console.log(categories.products_sections);
	},[categories])
	return (
		<div>
			<Hero title="categories" />
			<div className="container">
				<div className="grid grid-cols-1 gap-6 md:gap-10 py-8">
					{categories.products_sections.map((products, index) => {
						return(
							<Category key={index} products={products} />
						)
					})}
					{categories.brands_sections.map((brand, index) => {
						return(
							<Category key={index} brands={brand} />
						)
					})}
					{/* <Category title="Our Shop" data={categories.brands_sections} />
					<Category title="Our Shop" />
					<Category title="Our Shop" /> */}
				</div>
			</div>
		</div>
	)
}