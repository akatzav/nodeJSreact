export {};
/* import express, { Router } from "express";
import { ProductCard } from './db/models/product.js'
import products from "./data/products.js";

const router = Router()



router.post("/products", async (req, res) => {
    const newProduct = new ProdactCard({
        id: req.body._id,
        name: req.body.name,
        category: req.body.category,
        brand: req.body.brand,
        orginal_price: req.body.orginal_price,
        price:req.body.price,
        image:req.body.image,
        countInStock:req.body.countInStock
    });
    try {
        const result = await newProduct.insertMany(newProduct);
        res.json({ message: "Student Saved", id: result.id });
    } catch (e) {
        res.status(500).json({ message: "Error", error: e });
    }
}); */
/*

router.post("/products", async (req, res) => {
    await ProductCard.remove({});
    const importProducts = await ProductCard.insertMany(products)

    res.send({ importProducts })
})
export { router as routerProduct }; */ 
