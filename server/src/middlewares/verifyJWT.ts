import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import User from '../models/User';
import logger from '../config/logger';
import { ErrorApp } from '../Interfaces/ErrorApp';



const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {

    //check for token in headers
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader || !authHeader.toString().startsWith('Bearer ')) {
        throw new ErrorApp(401, "Invalid User", "verifyJWT", req.method as any, "Authorization header is missing or invalid", req.originalUrl)
    }

    const token = authHeader.toString().split(' ')[1]
    if (!token || token == null) {
        throw new ErrorApp(401, "Invalid User", "verifyJWT", req.method as any, "Token is missing", req.originalUrl)
    }


    const secret = process.env.ACCESS_TOKEN_SECRET
    if (!secret) {
        throw new ErrorApp(500, "Internal Server Error", "verifyJWT", req.method as any, "ACCESS_TOKEN_SECRET was not configured", req.originalUrl)
    }


    const payload = jwt.verify(token, secret) as jwt.JwtPayload;

    const user = await User.findOne({ userName: payload.userName });
    if (!user) {
        throw new ErrorApp(401, "Invalid User", "verifyJWT", req.method as any, "User does not exist", req.originalUrl)

    }
    req.user = user;

    next()

}

export default verifyJWT