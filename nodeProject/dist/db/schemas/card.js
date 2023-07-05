import { Schema } from "mongoose";
const businessCard = new Schema({
    name: String,
    title: String,
    address: String,
    phone: String,
    picture: String,
    nomOfBis: Number
});
export { businessCard };
