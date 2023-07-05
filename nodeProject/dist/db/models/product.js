import { model } from "mongoose";
import { product } from "../schemas/product.js";
const ProductCard = model('products', product);
export { ProductCard };
