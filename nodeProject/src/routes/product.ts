import express, { Router } from "express";
import { ProductCard } from './../db/models/product.js'
import products from "../data/products.js";
import _ from "underscore";
import { auth, isAdmin } from "../middleware/auth.js";

const router = express.Router()

router.get('/top-tree', async (req, res) => {
    const products = await ProductCard.find({
        inPage: true
    })
    res.json(products)
})

//GET all products
router.get('/', async (req, res) => {
    const products = await ProductCard.find()
    res.json(products)
})

//GET product by id
router.get('/:id', async (req, res) => {
    try {
        const product = await ProductCard.findOne({ _id: req.params.id })
        if (!product) {
            return res.status(404).json(null)
        }
        res.json(product)
    } catch (e) {
        console.log('findOne error: ', e.message)
        res.status(500).json({ message: 'server error' })
    }
})


// CRUD - create read update delete (entity/resource)

//rest api

/// route == path + method

// router.post('/products/') create product
// router.get('/products') read products []
// router.get('/products/:id') read product {}
// router.delete('/products/:id') read products



// CREATE product
router.post("/add", async (req, res) => {
    const body = _.pick(req.body, "inPage", "name", "brand", "category", "orginal_price", "price", "image")
    try {
        const newProduct = new ProductCard(body);
        await newProduct.save();
        return res.json(newProduct.toObject());

    }
    catch (e) {
        console.log('save error: ', e.message)
        res.status(500).json({ message: 'server error' })

    }
})



//DELETE product
router.delete("/:id", async (req, res) => {
    try {

        const productToDelete = await ProductCard.deleteOne({ _id: req.params.id });
        res.json(productToDelete)
    }
    catch (e) {
        console.log('delete error: ', e.message)
        res.status(500).json({ message: 'server error' })

    }
})

//UPDATE
router.put('/:id', auth, isAdmin, async (req, res) => {
    try {

        console.log('wors', req.body);


        const filter = { _id: req.params.id };
        const update = req.body
        let doc = await ProductCard.findOneAndUpdate(filter, update);
        res.json(doc)

    }
    catch (e) {
        console.log('update error: ', e.message)
        res.status(500).json({ message: 'server error' })

    }
})

//SEARCH
router.get('/:name', async (req, res) => {
    try {
        const search = await ProductCard.find({ name: req.params.name }).exec()
        res.json(search)
    }
    catch (e) {
        console.log('search error: ', e.message)
        res.status(500).json({ message: 'server error' })
    }

})

export { router as routerProduct };