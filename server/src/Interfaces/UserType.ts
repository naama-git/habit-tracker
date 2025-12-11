

import { Types } from 'mongoose'

export interface IUser {
    _id: Types.ObjectId | string,
    userName: string,
    email: string,
    password: string
}