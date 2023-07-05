import React, { useEffect } from 'react'
import { useParams } from 'react-router';

export const DeleteProduct = () => {
    const {id}=useParams();
    const url = `http://localhost:3001/api/products/${id}`;


        useEffect(()=>{
            fetch(url)
        })

        const removeProduct=()=>{

        }
    return (

        <div></div>
    )
}
