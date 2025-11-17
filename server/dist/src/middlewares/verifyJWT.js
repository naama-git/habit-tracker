"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const verifyJWT = async (req, res, next) => {
    //check for token in headers
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.toString().startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid1' });
    }
    const token = authHeader.toString().split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Invalid2' });
    }
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        return res.status(500).json({ message: 'ACCESS_TOKEN_SECRET not configured' });
    }
    const payload = jsonwebtoken_1.default.verify(token, secret);
    const user = await User_1.default.findOne({ userName: payload.userName });
    if (!user) {
        return res.status(401).json({ message: 'Invalid3' });
    }
    // console.log(user);
    req.user = user;
    //  console.log(req.user);
    next();
    // //verify token
    // jwt.verify(
    //     token,
    //     secret,
    //     (err, decode) => {
    //         if (err) {
    //             res.status(403).json({ message: 'Invalid' })
    //             return
    //         }
    //         //  (req as Request & { user?: JwtPayload }).user = decode as JwtPayload
    //           console.log(decode);
    //          const payload = decode as JwtPayload
    //          console.log(payload);
    //          req.user = {
    //             userName: payload.userName,
    //             email: payload.email,
    //             password: payload.password
    //          } as User;
    //         next()
    //     }
    // )
};
exports.default = verifyJWT;
//# sourceMappingURL=verifyJWT.js.map