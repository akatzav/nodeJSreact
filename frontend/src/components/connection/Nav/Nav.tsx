import React from 'react'
import css from './Nav.module.scss'
import { Link } from 'react-router-dom'


export const Nav = () => {
    return (
        <div className={css.Nav}>
            <Link to={'/Signup'} > Sign Up</Link>
            <Link to={'/Signin'} > Log In</Link>
        </div>
    )
}
