import { Router } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../db/config/auth.config.js";
import _ from "underscore";
import { User } from "../db/models/user.js";
import { validateSignUp } from "../middleware/verifySignupBody.js";
import { userAlreadyExists } from "../middleware/userAlreadyExists.js";
import bcrypt from "bcryptjs";
import { validateSignIn } from "../middleware/verifySignInBody.js";
import { Role } from "../db/models/role.js";
import jwtDecode from "jwt-decode";
import jwt from "jsonwebtoken";
import authConfig from "../db/config/auth.config.js";


const router = Router();


//GET all users:
router.get("/signup", async (req, res) => {
    //TODO: handle errors:
    try {
        const user = await User.find();
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: "Error", error: e });
    }
});



router.post("/signup", validateSignUp, userAlreadyExists, async (req, res) => {
    const body = _.pick(req.body, "username", "email", "password");

    body.password = await bcrypt.hash(body.password, 12);
    const user = new User(body);

    //before saving the user:

    try {
        //for each user -> save the role id of user
        user.roles = [await (await Role.findOne({ name: "user" }))._id];
        await user.save();
        return res.json({ message: "user saved", id: user._id });
    } catch (e) {
        return res.status(500).json({ message: "Server DB Error", error: e });
    }
});

router.post("/signin", validateSignIn, async (req, res) => {
    //email and password:
    try {
        console.log('req.body', req.body)
        //SELECT * FROM user JOIN Roles ON ...
        const user = await User.findOne({ email: req.body.email }).populate<{
            roles: Array<typeof Role>;
        }>("roles");

        if (!user) {
            return res.status(401).json({ message: "Invalid" });
        }

        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        );




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
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Server error", error: e });
    }

});

router.get('/current', async (req, res) => {
    console.log(req.headers);

    const accessToken = req.headers['x-auth-token'] ?? ''
    jwt.verify(accessToken as string, process.env.JWT_SECRET_KEY, async (err, payload: jwt.JwtPayload) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }
        const id = payload.id;
        const user = await User.findOne({ _id: id })
        res.json(user)
    });
})

router.get("/signin", async (req, res) => {
    const user = await User.find()
    res.json(user)
})

export { router as authRouter };