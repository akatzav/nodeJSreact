import React from 'react'
import css from './Card.module.scss'
import { NavLinks } from '../NavBar/NavLinks'
import { ToastContainer } from 'react-toastify'
import { Footer } from '../Footer/Footer'

export const Card = ({ cart }: any) => {

    const cartObject = cart.reduce((obj: any, product: any) => {
        if (obj[product._id]) {
            obj[product._id].push(product)
        }
        else {
            obj[product._id] = [product]
        }
        return obj
    }, {})

    console.log('cartObject', cartObject);

    return (
        <>
            <NavLinks />
            <ToastContainer />
            <div>{Object.keys(cartObject).map(id => {
                const p = cartObject[id][0]
                const total = cartObject[id].length
                return (
                    <div className={css.addToCart}>
                        <span className={css.span}>{total}</span>
                        <img src={p.image} alt={p.name} className={css.image} />
                        <div className={css.cardBody}>
                            <h5 className={css.title}>{p.name}</h5>
                            <p className={css.p}>
                                <span className={css.brand}> {p.brand}</span> <br />
                                <span className={css.price}>{p.price}</span><br />
                                <label htmlFor="" className={css.instead}>instead: </label>
                                <span className={css.orginal}>{p.orginal_price}</span><br />

                            </p>
                        </div>
                    </div>
                )
            })
            }</div>
            <Footer />
        </>
    )
}
