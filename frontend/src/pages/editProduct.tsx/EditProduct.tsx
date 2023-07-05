import React, { useEffect, useState } from 'react'
import { Product } from '../productList/ProductList';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { warn } from 'console';
import css from './EditProduct.module.scss'
import { Footer } from '../../components/Footer/Footer';
import { NavLinks } from '../../components/NavBar/NavLinks';


export const EditProduct = ({ user }: any) => {

    const [product, setProduct] = useState<any>(null)

    const [inPage, setInPage] = useState('')
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [orginal_price, setOrginal_price] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [updateUI, setUpdateUI] = useState(true)
    const { id } = useParams();
    const params = useParams();
    console.log(params);




    useEffect(() => {
        getProductDetails(id);
    }, [])

    const getProductDetails = async (id: any) => {
        console.warn("id:", id)

        await axios.get(`http://localhost:3001/api/products/${id}`).then(res => {
            console.log('res.data', res.data);
            setProduct(res.data)
        });



    }


    const updateProduct = (key: string, value: any) => {
        setProduct({ ...product, [key]: value })
    }

    console.log('product', product)


    const saveProduct = async () => {
        const response = await axios.put(`http://localhost:3001/api/products/${id}`, product, {
            headers: {
                'x-auth-token': localStorage.getItem('accessToken') ?? '',
            }
        })
        console.log('save product', response);

    }

    return (
        <>
            <NavLinks />
            {user?.isAdmin ? <Link to={'/add'} className={css.isAdmin}>Add</Link> : null}
            <div className={css.update}>
                <h1 className={css.title}>
                    Update Product
                </h1>
                <input className={css.input} type="text" value={product?.inPage} onChange={(e) => updateProduct('inPage', e.currentTarget.value)} placeholder='Show the product on the Home?' /><br />
                <input className={css.input} type="text" value={product?.name} onChange={(e) => updateProduct('name', e.currentTarget.value)} placeholder='Name' /><br />
                <input className={css.input} type="text" value={product?.brand} onChange={(e) => updateProduct('brand', e.currentTarget.value)} placeholder='Brand' /><br />
                <input className={css.input} type="text" value={product?.category} onChange={(e) => updateProduct('category', e.currentTarget.value)} placeholder='Category' /><br />
                <input className={css.input} type="text" value={product?.orginal_price} onChange={(e) => updateProduct('orginal_price', e.currentTarget.value)} placeholder='Orginal Price' /><br />
                <input className={css.input} type="text" value={product?.price} onChange={(e) => updateProduct('price', e.currentTarget.value)} placeholder='Price' /><br />
                <input className={css.input} type="text" value={product?.image} onChange={(e) => updateProduct('image', e.currentTarget.value)} placeholder='image' /><br />
                <button type='submit' className={css.button} onClick={saveProduct}>
                    Update Product
                </button>
                <ToastContainer />
                <Footer />
            </div>
        </>
    )
}
