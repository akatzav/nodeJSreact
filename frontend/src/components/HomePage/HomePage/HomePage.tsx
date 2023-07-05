import React, { useEffect, useState } from 'react'
import css from './HomePage.module.scss'
import NavBar from '../../NavBar/NavBar'
import { TitleAndDescription } from '../../TitleAndescription/TitleAndDescription'
import { Footer } from '../../Footer/Footer'
import { NavLinks } from '../../NavBar/NavLinks'
import { Nav } from '../../connection/Nav/Nav'
import { Search } from '../../search/Search'
import { Product } from '../../../pages/productList/ProductList'
import { Link } from 'react-router-dom'
import { FooterHomePage } from '../../Footer/FooterHomePage'

const url = 'http://localhost:3001/api/products/top-tree';

async function loadProducts() {
    const httpResponse = await fetch(url)
    const products: any[] = await httpResponse.json()
    console.log(products)
    return products;
}

export const HomePage = ({ user }: any) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadProducts().then(products => {
            setProducts(products);
        })
    }, [])

    return (
        <>
            <div className={css.homePage}>

                <div className={css.search}>
                    <input type="text" onChange={(e) => setSearch(e.currentTarget.value)} placeholder=' &#xf002; Search' className={css.input} />
                </div>



                <section className={css.section}>
                    {user ? <NavLinks /> : <NavBar />}
                    {user?.isAdmin ? <Link to='/add' className={css.isAdmin}>Add</Link> : null}
                    <TitleAndDescription />
                </section>

                <section className={css.section2}>
                    {
                        products.filter((product) => {
                            return search.toLowerCase() === '' ? product : product.name.toLocaleLowerCase().includes(search)
                        }).map(p => {
                            return (
                                <div className={css.card}>
                                    <Link to={`${p._id}`} className={css.link}>
                                        <img src={p.image} alt={p.name} className={css.image} />
                                        <h5 className={css.title}>{p.name}</h5>
                                        <p className={css.p}>
                                            <label htmlFor="" className={css.label}>Orginal price: </label>
                                            <span className={css.orginal}>{p.orginal_price}</span><br />
                                            <label htmlFor="" className={css.label}>Sale: </label>
                                            <span className={css.price}>{p.price}</span>
                                        </p>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </section>


            </div>
            <FooterHomePage />

        </>
    )
}
