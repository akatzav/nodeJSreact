import { NavLinks } from './NavLinks'
import css from './NavBar.module.scss'


export const Navigation = () => {
    return (
        <nav className={css.Navigation}>
            <NavLinks />
        </nav>
    )
}