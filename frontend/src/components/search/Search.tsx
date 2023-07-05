import React, { useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import css from './Search.module.scss'
import { useNavigate } from 'react-router-dom'


export const Search = () => {

    const [keyword,setKeyword]=useState('')
    console.log(keyword);

    const nav=useNavigate();

    const submitHandler=(e:any)=>{
        e.preventDefault()
        if(keyword.trim()){
            nav(`/search/${keyword}`)
        }
        else{
            nav('/')
        }
    };
    
    return (
        <div>
            <form onSubmit={submitHandler}>
            <section className={css.section}>
            <input type="text" className={css.search} placeholder='Search' onSubmit={submitHandler} onClick={(e)=>setKeyword(e.currentTarget.value)}/>
            <BiSearchAlt className={css.icon} />
        </section>
        </form>
        </div>
    )
}
