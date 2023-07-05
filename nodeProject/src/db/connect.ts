import mongoose from "mongoose";
import dbConfig from "./config/db.config.js";
import { Role } from "./models/role.js";
import products from "../data/products.js";
import { ProductCard } from "./models/product.js";

const { HOST, DB, PORT, ROLES } = dbConfig;

const connect = async () => {
    //mongoose 7 update:
    mongoose.set("strictQuery", false);
    await mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`);
    console.log(`Succesfully connected to the database ${DB}`);
    initDB();
    initDB2();
};


const initDB = () => {

    //save without joi
    //create the User/Admin/Mod roles
    //if Role collection is Empty:
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            ROLES.map((s) => new Role({ name: s })).forEach((role) => {
                role.save((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added ", role.name, "to Roles collection");
                    }
                });
            });
        }
    });
};

const initDB2 = () => {
    ProductCard.estimatedDocumentCount((err, count) => {
        if (count !== 0) return;

        if (!err) {
            products.map((p) => new ProductCard({ name: p.name, category: p.category, brand: p.brand, orginal_price: p.orginal_price, price: p.price, image: p.image, inPage: p.inPage })).forEach((product) => {
                product.save((err) => {
                    if (err) {
                        console.log(err);

                    }
                    else {
                        console.log("added ", product.name, "to products collection");

                    }
                });
            });
        }

    })
}
export { connect };