import React, { useEffect, useState } from 'react'
import Category from '../../components/Category'
import Hero from "../../components/Hero"
import { useSelector } from 'react-redux'
import axios from 'axios'

// export const getStaticProps = async () => {
//    const res = await fetch('https://backends.donnachoice.com/api/categories/');
//    let categories = await res.json();
//    return {
//       props: {
//          categories,
//       }
//    }
// }

export default function Categories() {
	const ar = useSelector(state => state.langs.value)
	const [categories, setCategories] = useState([]);
	useEffect(()=>{
		console.log(categories);
		axios.get('https://backends.donnachoice.com/api/categories/')
		.then(res => {
			setCategories(res.data);
		}
		).catch(err => console.log(err));
	},[categories])
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