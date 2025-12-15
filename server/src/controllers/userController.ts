

import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { log } from "node:console";


const signin = async (req: Request, res: Response) => {

    const { userName, email, password } = req.body

    const hashedPwd = await bcrypt.hash(password, 10)

    const createdUser = await User.create({ userName, email, password: hashedPwd })
    if (!createdUser) {
        return res.status(500).json({ massage: "Could not create user" })
    }
    return res.status(201).json({ massage: "User created successfully", user: createdUser })
}


//login controller
const login = async (req: Request, res: Response) => {
    const { userName, password } = req.body

    //validate input
    if (!userName || !password) {
        return res.status(401).json({ massage: "UserName and password are required fields" })
    }

    const user = await User.findOne({ userName }).lean()
    if (!user) {
        return res.status(404).json({ massage: "Invalid user1" })
    }
    const match = await bcrypt.compare(password, user.password)
    
    if (!match) {
        return res.status(401).json({ massage: "Invalid user" })
    }

    const secret = process.env.ACCESS_TOKEN_SECRET
    if (!secret) {
        return res.status(500).json({ message: 'ACCESS_TOKEN_SECRET not configured' })
    }
    const userInfo = {
        userName: user.userName,
        password: user.password
    }
    console.log(userInfo);

    const accessToken = jwt.sign(userInfo, secret)
    return res.status(200).json({ accessToken })

}

export default { signin, login }

