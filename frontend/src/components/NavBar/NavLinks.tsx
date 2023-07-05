import css from './NavLinks.module.scss'
import { motion } from 'framer-motion'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsPhone } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export const NavLinks = ({ user }: any) => {
    /* console.log('user', user); */

    return (

        <div className={css.navbar1}>
            <section className={css.section}>
                <p className={css.icon}><BsPhone size={35} color='red' /></p>
                <h5 className={css.name}>Non Stop Sale.</h5>
            </section>

            <div className={css.navLinks}>
                <Link to='/' className={css.link1}>  Home </Link>
                <Link to='/About' className={css.link1}>  About</Link>
                <Link to='/products' className={css.link1}> products</Link>
                {!!user?.isAdmin ? <Link to='/add' className=''>Add</Link> : null}
                <Link to='/card' className={css.link1}> <AiOutlineShoppingCart /></Link>
            </div>

        </div>
    )
}