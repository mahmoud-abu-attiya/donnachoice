import React, { useEffect } from 'react'
import Category from '../../components/Category'
import Hero from "../../components/Hero"

export const getStaticProps = async () => {
   const res = await fetch('http://3.83.152.24/api/brand/?category');
   let brands = await res.json();
   return {
      props: {
         brands: brands
      }
   }
}

export default function Categories({ brands }) {
	useEffect(()=>{
		console.log(brands);
	},[brands])
	return (
		<div>
			<Hero title="categories" />
			<div className="container">
				<div className="grid grid-cols-1 gap-6 md:gap-10 py-8">
					<Category title="Our Shop" />
					<Category title="Our Shop" />
					<Category title="Our Shop" />
				</div>
			</div>
		</div>
	)
}