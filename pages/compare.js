import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import ProductBox from '../components/ProductBox';

// export const getStaticProps = async () => {
//    const res = await fetch('https://backends.donnachoice.com/api/products/?slug__in=product,item-2');
//    let products = await res.json();

//    return {
//       props: {
//          products,
//       }
//    }
// }

const Compare = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const storedCompare = JSON.parse(localStorage.getItem("stored-compare")) || []
        if (storedCompare.length < 1) {
            storedCompare.push("---")
        }
        console.log(storedCompare)
        axios.get('https://backends.donnachoice.com/api/products/?slug__in=' + storedCompare).then(res => {
            setProducts(res.data)
            setLoading(false)
        })
    }, []);

    if (loading) {
        return <>
            <div>
                <p>Loading</p>
            </div>
        </>
    }

    return (
        <div className='container p-5 flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {products.length == 0 ? "there is no products in compare yet."
                : (
                    products.map(product => {
                        return (
                            <ProductBox key={product.id} product={product} />
                        )
                    })
                )}</div>
    )
}

export default Compare