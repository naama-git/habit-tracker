import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import User from '../models/User';



const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {

    //check for token in headers
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader || !authHeader.toString().startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid1' })
    }

    const token = authHeader.toString().split(' ')[1]
    if (!token || token == null) {
        return res.status(401).json({ message: 'Invalid2' })
    }

    const secret = process.env.ACCESS_TOKEN_SECRET
    if (!secret) {
        return res.status(500).json({ message: 'ACCESS_TOKEN_SECRET not configured' })
    }

    const payload = jwt.verify(token, secret) as jwt.JwtPayload;
    // if(!payload) return res.status(401).json({massage:'Please Log In First'})

    const user = await User.findOne({ userName: payload.userName });
    if (!user) {
        return res.status(401).json({ message: 'Invalid3' })
    }
    // console.log(user);
    req.user = user;
    //  console.log(req.user);

    next()

}

export default verifyJWT