import jwt from 'jsonwebtoken';
export const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send('Access denied. Not authenticated...');
    }
    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const user = jwt.verify(token, secretKey);
        console.log(user);
        req.user = user;
        next();
    }
    catch (ex) {
        console.log(ex.message);
        res.status(400).send('Access denied. Invalid auth token...');
    }
};
export const isAdmin = (req, res, next) => {
    var _a;
    if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin) {
        next();
    }
    else {
        res.status(403).send('Access denied. Not authorized...');
    }
};
