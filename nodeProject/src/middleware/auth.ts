import { RequestHandler } from "express";
import { Role } from "../db/models/role.js";
import { User } from "../db/models/user.js";

import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {

        return res.status(401).send('Access denied. Not authenticated...')
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const user = jwt.verify(token, secretKey)
        console.log(user);

        req.user = user

        next();
    } catch (ex) {
        console.log(ex.message);

        res.status(400).send('Access denied. Invalid auth token...')
    }
}

export const isAdmin = (req, res, next) => {

    if (req.user?.isAdmin) {
        next();
    }
    else {
        res.status(403).send('Access denied. Not authorized...')
    }

}
