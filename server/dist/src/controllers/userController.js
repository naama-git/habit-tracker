"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import User from ' ../models/User';
const signin = async (req, res) => {
    const { userName, email, password } = req.body;
    //validate input
    // if (!userName || !email || !password) {
    //     return res.status(401).json({ massage: "UserName, email and password are required fields" })
    // }
    const hashedPwd = await bcrypt_1.default.hash(password, 10);
    console.log({ userName, email, password: hashedPwd });
    const user = await User_1.default.create({ userName, email, password: hashedPwd });
    if (!user) {
        return res.status(500).json({ massage: "Could not create user" });
    }
    return res.status(201).json({ massage: "User created successfully", user });
};
//login controller
const login = async (req, res) => {
    const { userName, password } = req.body;
    // console.log("in");
    //validate input
    if (!userName || !password) {
        return res.status(401).json({ massage: "UserName and password are required fields" });
    }
    const user = await User_1.default.findOne({ userName }).lean();
    if (!user) {
        return res.status(404).json({ massage: "Invalid user1" });
    }
    const match = await bcrypt_1.default.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ massage: "Invalid user" });
    }
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        return res.status(500).json({ message: 'ACCESS_TOKEN_SECRET not configured' });
    }
    const userInfo = {
        userName: user.userName,
        password: user.password
    };
    console.log(userInfo);
    const accessToken = jsonwebtoken_1.default.sign(userInfo, secret);
    return res.status(200).json({ accessToken });
};
exports.default = { signin, login };
//# sourceMappingURL=userController.js.map