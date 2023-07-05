import React, { useEffect, useState } from 'react'
import { Product } from '../../pages/productList/ProductList'
import css from './Filter.module.scss'
import { Link } from 'react-router-dom'


const url = 'http://localhost:3001/api/products';

async function loadProducts() {
    const httpResponse = await fetch(url)
    const products: any[] = await httpResponse.json()
    console.log(products)
    return products;
}


export const Filter = () => {

    useEffect(() => {
        loadProducts().then(products => {
            setProduct(products);
        })
    }, [])

    const [product, setProduct] = useState<Product[]>([])

    const computers = product.filter(p => p.category === 'Computers');
    const phones = product.filter(p => p.category === 'Phones');
    const iPad = product.filter(p => p.category === 'iPad');

    const apple = product.filter(p => p.brand === "Apple");
    const galaxy = product.filter(p => p.brand === "Galaxy");
    const samsung = product.filter(p => p.brand === "Samsung");

    return (
        <>
            <div className={css.filter}>
                <h1 className={css.title}>Filter by:</h1>

                <select name="selectCategory" onChange={(e) => {
                    let category1 = e.currentTarget.value;
                    switch (category1) {
                        case 'computers': setProduct(computers); break;
                        case 'phones': setProduct(phones); break;
                        case 'iPad': setProduct(iPad); break;
                    }
                }}>

                    <option value="computers">computers</option>
                    <option value="phones">phones</option>
                    <option value="iPad">iPad</option>

                </select>

                <div className={css.filterProducts}>
                    {product.map(p => {

                        return (
                            <div className={css.product} data-aos='zoom-in' key={p._id} {...p} >
                                <img src={p.image} alt={p.name} className={css.image} />
                                <div className={css.cardBody}>
                                    <Link to={`${p._id}`} className={css.link}>
                                        <h5 className={css.title}>{p.name}</h5>
                                        <p className={css.p}>
                                            <span className={css.brand}> {p.brand}</span> <br />
                                            <span className={css.price}>{p.price}</span><br />
                                            <label htmlFor="" className={css.instead}>instead: </label>
                                            <span className={css.orginal}>{p.orginal_price}</span><br />

                                        </p>

                                    </Link>
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div >
        </>
    )
}
