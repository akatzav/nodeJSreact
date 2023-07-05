import { Schema } from "mongoose";
const student = new Schema({
    firstName: String,
    lastName: String,
    email: String
});
export { student };
