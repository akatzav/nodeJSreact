/* import { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import css from './editProduct.module.scss'
import React from "react";


const EditCard = () => {
    const { id } = useParams();
    const nav = useNavigate();
    //get all the cards from the store:
    const cards = useAppSelector((state) => state.card.cards);
    //dispatch actions:
    const dispatch = useAppDispatch();

    const cardToEdit = cards.find((c) => c.id === id);

    const [open,setOpen]=React.useState(false);
    const [name, setName] = useState("")
    const [category, setCategory] = useState( "")
    const [brand, setBrand] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")

    if (cardToEdit === undefined) {
        return <Navigate to="/" />
    }


    return (
        <div>
            <div dir="rtl" className={css.edit}>
                <h3 className={css.title1}>עריכת פרטים:</h3>
                <div className=''>
                    <label htmlFor="name" className={css.label1}>שם המסעדה:</label>
                    <input
                        id="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.currentTarget.value)
                        }}
                        placeholder="name" className={css.input1}
                    />
                </div>

                <label htmlFor="">Category:</label>
                <select className={css.select1}
                    value={category}
                    name="category"
                    id="category"
                    onChange={(e) => {
                        const cat = e.currentTarget.value as category;
                        setCategory(cat)
                    }}
                >
                    <option value="בחירה">Computers</option>
                    <option value="כשר">Phones</option>
                    <option value="מהדרין">Tablet</option>
                    <option value="מחפוד">Iped</option>
                    <option value="רבנות">Headphones</option>
                </select>
                
                <div dir="rtl" className={css.edit}>
                    <div className=''>
                        <label htmlFor="brand" className={css.label1}>Brand:</label>
                        <input
                            id="Brand"
                            value={brand}
                            onChange={(e) => {
                                setBrand(e.currentTarget.value)
                            }}
                            placeholder="Brand" className={css.input1}
                        />
                    </div>

                    <div className=''>
                        <label htmlFor="price" className={css.label1}>Price:</label>
                        <input
                            id="price"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.currentTarget.value)
                            }}
                            placeholder="price" className={css.input1}
                        />
                    </div>

                <div className=''>
                    <label htmlFor="image" className={css.label1}>image</label>
                    <input
                        id="image"
                        value={image}
                        onChange={(e) => {
                            setImage(e.currentTarget.value)
                        }}
                        placeholder="image" className={css.input1}
                    />
                </div>
                <br />
                <br />

                <button className={css.editing}
                    onClick={() => {
                        const card: Card = {
                            id: cardToEdit.id,
                            name: name,
                            image: image,
                        };

                        dispatch(editCard(card));
                        nav(-1)
                    }}
                >
                    סיום עריכה 
                </button>
            </div>
        </div>


    );
};

export default EditCard */

import React from 'react'

export const EditProduct = () => {
  return (
    <div>EditProduct</div>
  )
}
