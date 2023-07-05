import { Schema } from "mongoose";
const attraction = new Schema({
    name: String,
    description: String,
    brand: String,
    price: Number,
    image: String
});
export { attraction };
