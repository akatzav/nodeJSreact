import { Schema } from "mongoose";
const cardsSchema = new Schema({
    name: String,
    description: String,
    address: String,
    phone: String,
    image: String,
    bizNumber: Number,
});
export { cardsSchema };
