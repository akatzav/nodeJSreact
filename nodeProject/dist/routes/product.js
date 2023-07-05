var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { ProductCard } from './../db/models/product.js';
import _ from "underscore";
import { auth, isAdmin } from "../middleware/auth.js";
const router = express.Router();
router.get('/top-tree', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield ProductCard.find({
        inPage: true
    });
    res.json(products);
}));
//GET all products
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield ProductCard.find();
    res.json(products);
}));
//GET product by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductCard.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(404).json(null);
        }
        res.json(product);
    }
    catch (e) {
        console.log('findOne error: ', e.message);
        res.status(500).json({ message: 'server error' });
    }
}));
// CRUD - create read update delete (entity/resource)
//rest api
/// route == path + method
// router.post('/products/') create product
// router.get('/products') read products []
// router.get('/products/:id') read product {}
// router.delete('/products/:id') read products
// CREATE product
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = _.pick(req.body, "inPage", "name", "brand", "category", "orginal_price", "price", "image");
    try {
        const newProduct = new ProductCard(body);
        yield newProduct.save();
        return res.json(newProduct.toObject());
    }
    catch (e) {
        console.log('save error: ', e.message);
        res.status(500).json({ message: 'server error' });
    }
}));
//DELETE product
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productToDelete = yield ProductCard.deleteOne({ _id: req.params.id });
        res.json(productToDelete);
    }
    catch (e) {
        console.log('delete error: ', e.message);
        res.status(500).json({ message: 'server error' });
    }
}));
//UPDATE
router.put('/:id', auth, isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('wors', req.body);
        const filter = { _id: req.params.id };
        const update = req.body;
        let doc = yield ProductCard.findOneAndUpdate(filter, update);
        res.json(doc);
    }
    catch (e) {
        console.log('update error: ', e.message);
        res.status(500).json({ message: 'server error' });
    }
}));
//SEARCH
router.get('/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = yield ProductCard.find({ name: req.params.name }).exec();
        res.json(search);
    }
    catch (e) {
        console.log('search error: ', e.message);
        res.status(500).json({ message: 'server error' });
    }
}));
export { router as routerProduct };
