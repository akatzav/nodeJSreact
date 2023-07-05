import axios from 'axios'
import React, { useState } from 'react'
import { BiEditAlt, BiTrashAlt } from 'react-icons/bi'
import { Product } from '../../pages/productList/ProductList'
import setUser from '../../App'

export const List = ({ id, product, setUpdateUI, updateMode, onClickEdit }: any) => {

    const [products, setProducts] = useState<Product[]>([])
    const [state, setState] = useState('')
    const [updataID, setUpdateID] = useState(null)


    const removeProduct = async () => {
        await axios.delete(`http://localhost:3001/api/products/${id}`).then(res => {
            console.log(res);
            setUpdateUI((prevState: any) => !prevState)
            setProducts([...products.concat([product._id])])
        });
    }

    return (
        <>
            <li>
                {product}
                <div className='icon_holder'>
                    <BiEditAlt className='icon' onClick={onClickEdit} />
                    <BiTrashAlt className='icon' onClick={removeProduct} />
                </div>
            </li>

        </>


    )
}

