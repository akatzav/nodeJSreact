import 'dotenv/config';
import express from "express";
import morgan from "morgan";
import { connect } from "./db/connect.js";
import { notFound } from "./middleware/not-found.js";
import { booksRouter } from "./routes/books.js";
import { cardsRouter } from "./routes/cardBus.js";
import { studentsRouter } from "./routes/student.js";
import { authRouter } from "./routes/users.js";
import { loginRouter } from "./routes/login.js";
import { routerProduct } from "./routes/product.js";
const app = express();
//once app starts: connect to db: and fill the roles collection
connect().catch((e) => {
    console.log(e);
});
//middlewares:
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-requested-with,");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type , Accept, x-auth-token');
    next();
});
app.use(express.json());
app.use(morgan("dev"));
// path + method
// MERN stack
//routes:
app.use("/api/books", booksRouter);
app.use("/api/cards", cardsRouter);
app.use("/api/students", studentsRouter);
app.use("/api/auth", authRouter);
app.use("/api/login", loginRouter);
app.use("/api/products", routerProduct);
app.use(notFound);
const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
