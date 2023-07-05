import { model } from "mongoose";
import { attraction } from "../schemas/product.js";
const prodactCard = model('attraction', attraction);
export { prodactCard };
