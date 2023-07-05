import css from './NavBar.module.scss'
import { MobileNavigation } from './MobileNavigation';
import { Navigation } from './Navigation';
import { Link } from 'react-router-dom';
import { BsPhone } from 'react-icons/bs'

export const NavBar = () => {
    return (
        <div className={css.mainNavbar}>
            <div className={css.NavBar}>
                <Link to='/Signup' className={css.link}> Sign up</Link>
                <Link to='/Signin' className={css.link}> Log In</Link>
            </div>
            <section className={css.section}>
                <p className={css.icon}><BsPhone size={35} color='red' /></p>
                <h5 className={css.name}>Non Stop Sale.</h5>
            </section>

        </div>
    )
}

export default NavBar;