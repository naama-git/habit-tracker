

import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { log } from "node:console";
import { ErrorApp } from "../Interfaces/ErrorApp";


const signin = async (req: Request, res: Response) => {

    const { userName, email, password } = req.body

    const hashedPwd = await bcrypt.hash(password, 10)

    const createdUser = await User.create({ userName, email, password: hashedPwd })
    if (!createdUser) {
        throw new ErrorApp(500, "Internal server error", "signin", req.method as any, "Failed to create user", req.originalUrl)
    }
    return res.status(201).json({ message: "User created successfully", user: createdUser })
}


//login controller
const login = async (req: Request, res: Response) => {
    const { userName, password } = req.body

    const user = await User.findOne({ userName }).lean()
    if (!user) {
        throw new ErrorApp(401, "Invalid User", "login", req.method as any, "userName was not found in DB", req.originalUrl)
    }
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw new ErrorApp(401, "Invalid User", "login", req.method as any, "password is incorrect", req.originalUrl)
    }

    const secret = process.env.ACCESS_TOKEN_SECRET
    if (!secret) {
        throw new ErrorApp(500, "Internal server error", "login", req.method as any, "ACCESS_TOKEN_SECRET not configured", req.originalUrl)

    }
    const userInfo = {
        userName: user.userName,
        password: user.password
    }

    const accessToken = jwt.sign(userInfo, secret)
    if (!accessToken) {
        throw new ErrorApp(500, "Internal server error", "login", req.method as any, "Failed to create access token", req.originalUrl)
    }
    return res.status(200).json({ accessToken })

}

export default { signin, login }

