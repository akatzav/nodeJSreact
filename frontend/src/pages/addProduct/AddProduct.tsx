import React, { useEffect, useState } from 'react'
import { List } from '../../components/list/List';
import axios from 'axios';
import data from '../../data/products';
import { Product } from '../productList/ProductList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import css from './AddProduct.module.scss'
import { NavLinks } from '../../components/NavBar/NavLinks';
import { Footer } from '../../components/Footer/Footer';
import { FooterHomePage } from '../../components/Footer/FooterHomePage';
import { log } from 'console';

export const AddProduct = ({ user }: any) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [inPage, setInPage] = useState('')
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [orginal_price, setOrginal_price] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [updateUI, setUpdateUI] = useState(true)
    const [selects, setSelects] = useState('');

    const showToastMessage = () => {
        toast.success('Success Added !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    useEffect(() => {
        axios.get("http://localhost:3001/api/products")
            .then((res) => {
                console.log(res.data);
                setProducts(res.data)
            })
    }, [])


    const addProduct = (e: any) => {
        e.preventDefault();

        const newProduct = {
            name,
            brand,
            category,
            orginal_price,
            price,
            image
        }

        fetch('http://localhost:3001/api/products/add', {
            method: 'POST',//or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),

        }).then(res => res.json())
            .then(json => {
                // after server response
                console.log('json', json);

                showToastMessage();
                setProducts([...products, json])

            }).catch(e => console.log(e));

        //code?
    }

    const onClickEdit = (product: any) => {
        console.log(product)
        setName(product.name)
        setBrand(product.brand)
        setCategory(product.category)
        setOrginal_price(product.orginal_price)
        setPrice(product.price)
        setImage(product.image)
    }

    if (!user?.isAdmin) {
        return <Navigate to='/' />
    }


    return (
        <div className={css.add}>
            <NavLinks />
            <div className={css.added}>
                <h1 className={css.title}>Add Product: </h1>

                <select name="" id="" value={inPage} className={css.select} onChange={(e) => {
                    const select1 = e.currentTarget.value;
                    setInPage(select1)
                }}>
                    <option>Will product appear on the main page?</option>
                    <option>true</option>
                    <option>false</option>
                </select><br />
                {/* <input type="text" value={inPage} onChange={(e) => setInPage(e.currentTarget.value)} placeholder='Name' className={css.input} /><br /> */}
                <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} placeholder='Name' className={css.input} /><br />
                <input type="text" value={brand} onChange={(e) => setBrand(e.currentTarget.value)} placeholder='Brand' className={css.input} /><br />
                <input type="text" value={category} onChange={(e) => setCategory(e.currentTarget.value)} placeholder='Category' className={css.input} /><br />
                <input type="text" value={orginal_price} onChange={(e) => setOrginal_price(e.currentTarget.value)} placeholder='Orginal Price' className={css.input} /><br />
                <input type="text" value={price} onChange={(e) => setPrice(e.currentTarget.value)} placeholder='Price' className={css.input} /><br />
                <input type="text" value={image} onChange={(e) => setImage(e.currentTarget.value)} placeholder='image' className={css.input} /><br />
                <button type='submit' onClick={addProduct} className={css.button}>
                    Add Product
                </button>
                <div>

                </div>

            </div>

            <ToastContainer />

            {/*  <ul>
                {products.map(p => (
                    <List key={p._id} id={p._id} product={p.name} setUpdateUI={setUpdateUI} onClickEdit={() => onClickEdit(p)} />
                )
                )}
            </ul> */}
            <FooterHomePage />
        </div>
    )
}
