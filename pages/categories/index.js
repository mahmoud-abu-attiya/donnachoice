import React from 'react'
import Category from '../../components/Category'
import Hero from "../../components/Hero"

export default function categories() {
	return (
		<div>
			<Hero />
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