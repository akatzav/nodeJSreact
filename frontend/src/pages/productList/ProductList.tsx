import React, { useEffect, useState } from 'react'
import data from '../../data/products'
import css from './ProductList.module.scss'
import { Footer } from '../../components/Footer/Footer'
import NavBar from '../../components/NavBar/NavBar'
import { CallToActionSection } from '../../components/HomePage/CalltoActionSection/CallToActionSection'
import axios from 'axios'
import { Search } from '../../components/search/Search'
import { BiTrashAlt } from 'react-icons/bi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { NavLinks } from '../../components/NavBar/NavLinks'
import { Filter } from '../../components/filter/Filter'


const url = 'http://localhost:3001/api/products';

async function loadProducts() {
    const httpResponse = await fetch(url)
    const products: any[] = await httpResponse.json()
    console.log(products)
    return products;
}

export interface Product {
    _id: string;
    inPage: boolean,
    name: string;
    category: string;
    brand: string;
    orginal_price: string;
    price: string;
    image: string;
}

export const ProductList = ({ user, product, setUpdateUI, updateMode, onClickEdit, addToCart }: any) => {
    const [products, setProducts] = useState<Product[]>([])
    const [search, setSearch] = useState('');
    const [card, setCard] = useState([]);
    const [status, setStatus] = useState('')
    const [updateUI, setUpdateID] = useState(null)
    const [filter1, setFilter1] = useState('');
    console.log("filter1:", filter1);

    const [filter2, setFilter2] = useState('');
    console.log('filter2:', filter2);


    const { id } = useParams();
    console.log('id', id);

    console.log(search);

    const navigate = useNavigate();

    const showSuccessToastMessage = () => {
        toast.success('Success Deleted !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showErrorToassyMessage = () => {
        toast.error('Error!', {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const removeProduct = async (id: any) => {
        console.warn(id)
        let result = await fetch(`http://localhost:3001/api/products/${id}`, {
            method: 'DELETE'
        });
        result = await result.json()

        if (result) {
            showSuccessToastMessage();

            loadProducts().then(products => {
                setProducts(products);
            })
        }
        else {
            showErrorToassyMessage();
        }
    }


    const handleClick = (item: any) => {
        console.log(item._id);

    }


    useEffect(() => {
        loadProducts().then(products => {
            setProducts(products);
        })
    }, []) // run after first render (mount)

    //if(user.isAdmin)


    const filterCategory = (e: any) => {
        console.log(e.currentTarget.value);
    }

    const onFilterValueSelect = (e: any) => {

    }


    return (
        <>
            <div className={css.productList}>
                <NavLinks />
                {user?.isAdmin ? <Link to={'/add'} className={css.isAdmin}>Add</Link> : null}

                <div className={css.search}>
                    <input type="text" onChange={(e) => setSearch(e.currentTarget.value)} placeholder=' &#xf002; Search' className={css.input} />
                </div>

                <div className={css.select}>
                    <h1 className={css.titleSelect}>filter by category:</h1>
                    <select name="" id="" onChange={e => setFilter1(e.currentTarget.value)} className={css.select1}>
                        <option>all</option>
                        <option>computers</option>
                        <option>Phones</option>
                        <option>iPad</option>
                    </select>


                    <h1 className={css.titleSelect}>filter by brand:</h1>
                    <select name="" id="" onChange={e => setFilter2(e.currentTarget.value)} className={css.select1}>
                        <option>All</option>
                        <option>Apple</option>
                        <option>Galaxy</option>
                        <option>Lenovo</option>
                        <option>Samsung</option>
                        <option>Microsoft</option>
                        <option>Dell</option>
                    </select>
                </div>

                <div className={css.page}>
                    {products.filter((product) => {
                        return search.toLowerCase() === '' ? product : product.name.toLocaleLowerCase().includes(search)
                    }).filter((c) => {
                        if (filter1 === 'All') {
                            return c;
                        } else if (c.category.toLowerCase().includes(filter1.toLowerCase())) { return c; }
                    }).filter((b) => {
                        if (filter2 === 'All') {
                            return b;
                        } else if (b.brand.toLowerCase().includes(filter2.toLowerCase())) { return b; }
                    }).map(p => {

                        return (
                            <div className={css.product} data-aos='zoom-in' key={p._id} >
                                <img src={p.image} alt={p.name} className={css.image} />
                                <div className={css.cardBody}>
                                    <Link to={`${p._id}`} className={css.link}>
                                        <h5 className={css.title}>{p.name}</h5>
                                        <p className={css.p}>
                                            <span className={css.brand}> {p.brand}</span> <br />
                                            <span className={css.price}>{p.price}</span><br />
                                            <label htmlFor="" className={css.instead}>instead: </label>
                                            <span className={css.orginal}>{p.orginal_price}</span><br />

                                        </p>

                                    </Link>
                                </div>
                                <div className={css.buttons}>

                                    <ToastContainer />
                                    {!!user?.isAdmin && (<button className={css.delete} onClick={() => removeProduct(p._id)}> delete </button>)}
                                    <button className={css.add} onClick={() => addToCart(p)}>Add To Cart</button>
                                    {!!user?.isAdmin && (<Link to={`/update/${p._id}`} className={css.update}>Update</Link>)}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    )
}
