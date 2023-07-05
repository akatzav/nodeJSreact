import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"


export const ShopSection = () => {
    const [products, setProducts] = useState<any[]>([])

    const url='http://localhost:3001/api/products'
    useEffect(() => {
        const fetchProducts=async()=>{
            const {data}=await axios.get(url);
            setProducts(data)
        }
        fetchProducts()

    },[])
    return (
        <>
            <div className="container">
                <div className='section'>
                    <div className="row">
                        <div className='col-lg-12 col-md-12 article'>
                            <div className='shopcontainer row'>
                                {products.map((product) => (
                                    <div className='shop col-lg-4 col-md-6 col-sm-6' key={product._id}>
                                        <div className='border-product'>
                                            <Link to={`/products/${product._id}`}>
                                                <div className='shopBack'>
                                                    <img src={product.image} alt={product.name} />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
