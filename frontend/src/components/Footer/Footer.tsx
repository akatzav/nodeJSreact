import React, { useState } from 'react'
import { BiCopyright } from 'react-icons/bi'
import css from './Footer.module.scss'
import { AiFillApple, AiFillInstagram, AiFillTwitterCircle, AiOutlineCopyrightCircle, AiOutlineMail, AiOutlineWhatsApp } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { GiGalaxy } from 'react-icons/gi'
import { MdPhoneIphone } from 'react-icons/md'
import { SiSamsung } from 'react-icons/si'

export const Footer = () => {
    const [email, setEmail] = useState();
    return (
        <footer className={css.footer}>
            <div className={css.p1}>

                <ul className={css.brand}>
                    <h5 className={css.h52}>Brand:</h5>
                    <li><AiFillApple /> Apple</li>
                    <li><SiSamsung /> Samsung</li>
                    <li><GiGalaxy /> Galaxy</li>
                    <li><MdPhoneIphone /> Iphon</li>
                </ul>

                <div className={css.vl}></div>

                <ul className={css.contact}>
                    <h5 className={css.h52}>Contact:</h5>
                    <li><AiOutlineWhatsApp /> 054-877-1139</li>
                    <li><AiOutlineMail /> Avigailkatzav@gmail.com</li>
                    <li><AiFillInstagram />aKatzav</li>
                </ul>

                <div className={css.vl1}></div>

                <form action="" className={css.form}>
                    <h5 className={css.h5}>Want tips for smart shopping?</h5>
                    <input type="email" placeholder='Enter your Email..' className={css.input} value={email} />
                    <button className={css.button}>Submit</button>
                    <div className={css.copy}><AiOutlineCopyrightCircle /> Avigail Katzav, 2023</div>
                </form>

            </div>
        </footer>
    )
}
