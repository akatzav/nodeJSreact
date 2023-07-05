import { NavLinks } from './NavLinks'
import css from './NavBar.module.scss'
import { CgMenuRound } from 'react-icons/cg'
import { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'



export const MobileNavigation = () => {/* 
    const [open, setOpen] = useState(false);

    const hamburgerIcon = <CgMenuRound className={css.Hamburder}
        size="35px" color="white"
        onClick={() => setOpen(!open)} />


    const closeIcon = <AiOutlineCloseCircle className={css.Hamburder}
        size="35px" color="white"
        onClick={() => setOpen(!open)} />

    const closeMobileMenu = () => setOpen(false);
 */
    return (
        <nav className={css.MobileNavigation}>
            {/* {open ? closeIcon : hamburgerIcon}
            {open && <NavLinks isMobile={true} closeMobileMenu={closeMobileMenu} />} */}
        </nav>
    )
}