import React, { useEffect, useState } from 'react'
import css from './ItemProduct.module.scss'
import { Product, ProductList } from '../productList/ProductList'
import logo from '../../logo.svg'
import { useParams } from 'react-router-dom'
import { Footer } from '../../components/Footer/Footer'
import { NavLinks } from '../../components/NavBar/NavLinks'




export const ItemProduct = (prop: any) => {

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const url = `http://localhost:3001/api/products/${id}`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(json => setProduct(json))
            .then(json => setLoading(false))
        console.log(prop);

    }, [])  // run after first render (mount)

    console.log('product', product)
    console.log('id', id)



    return (
        <><NavLinks />
            <div className={css.product}>

                <p className={css.p}>
                    <div className={css.main}>
                        <img src={product?.image ?? ''} alt={product?.name} className={css.image} /><br />
                    </div>
                    {/* <label htmlFor="" className={css.label}>Name: </label> */}
                    <div className={css.section}>
                        <li className={css.detail0}>{product?.name ?? ''}</li><br />
                        <label htmlFor="" className={css.label}>Brand: </label>
                        <li className={css.detail1}>{product?.brand ?? ''}</li><br />
                        <label htmlFor="" className={css.label}>Price: </label>
                        <li className={css.detail2}>{product?.price ?? ''}</li><br />
                        <label htmlFor="" className={css.label}>Instead Of: </label>
                        <li className={css.detail3}>{product?.orginal_price ?? ''}</li><br />
                        <label htmlFor="" className={css.label}>Category: </label>
                        <li className={css.detail5}>{product?.category ?? ''}</li><br />
                        <button className={css.add}>Add To Card</button>
                    </div>
                </p>

            </div>
            <Footer />
        </>
    )
}

