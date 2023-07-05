var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import jwt from "jsonwebtoken";
import _ from "underscore";
import { User } from "../db/models/user.js";
import { validateSignUp } from "../middleware/verifySignupBody.js";
import { userAlreadyExists } from "../middleware/userAlreadyExists.js";
import bcrypt from "bcryptjs";
import { validateSignIn } from "../middleware/verifySignInBody.js";
import { Role } from "../db/models/role.js";
const router = Router();
//GET all users:
router.get("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO: handle errors:
    try {
        const user = yield User.find();
        res.json(user);
    }
    catch (e) {
        res.status(500).json({ message: "Error", error: e });
    }
}));
router.post("/signup", validateSignUp, userAlreadyExists, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = _.pick(req.body, "username", "email", "password");
    body.password = yield bcrypt.hash(body.password, 12);
    const user = new User(body);
    //before saving the user:
    try {
        //for each user -> save the role id of user
        user.roles = [yield (yield Role.findOne({ name: "user" }))._id];
        yield user.save();
        return res.json({ message: "user saved", id: user._id });
    }
    catch (e) {
        return res.status(500).json({ message: "Server DB Error", error: e });
    }
}));
router.post("/signin", validateSignIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //email and password:
    try {
        console.log('req.body', req.body);
        //SELECT * FROM user JOIN Roles ON ...
        const user = yield User.findOne({ email: req.body.email }).populate("roles");
        if (!user) {
            return res.status(401).json({ message: "Invalid" });
        }
        const isPasswordValid = yield bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid" });
        }
        /*
                if (!isPasswordValid) {
                    return res.status(401).json({ message: "Invalid Credentials" });
                } */
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
        });
        const authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
            authorities.push(`ROLE_` + user.roles[i].name.toUpperCase());
        }
        return res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken: token,
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Server error", error: e });
    }
}));
router.get('/current', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.headers);
    const accessToken = (_a = req.headers['x-auth-token']) !== null && _a !== void 0 ? _a : '';
    jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }
        const id = payload.id;
        const user = yield User.findOne({ _id: id });
        res.json(user);
    }));
}));
router.get("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.find();
    res.json(user);
}));
export { router as authRouter };
