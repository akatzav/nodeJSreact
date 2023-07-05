import { Schema } from "mongoose";
const product = new Schema({
    inPage: { type: Boolean, required: false },
    name: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    orginal_price: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
}, {
    timestamps: true,
});
export { product };
