import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express'
import cors from 'cors'
import corsOptions from './config/corsOptions';
import { connectDB } from './config/dbconn';
import mongoose from 'mongoose';
import 'module-alias/register';
import { morganMiddleware } from './middlewares/morgan';
import logger from './config/logger';

const app = express()
const PORT = process.env.PORT || 1100

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use(morganMiddleware)

connectDB();

app.get('/', (req: Request, res: Response) => {
    res.send("Home Page")
})

import userRouter from './routes/userRoute';
app.use('/user', userRouter);

import habitRouter from './routes/habitRoute'
app.use('/myHabits', habitRouter)

import trackHabitRouter from './routes/trackHabitRoute'
app.use('/trackHabit', trackHabitRouter)

import { errorHandler } from './middlewares/errorHandling';
app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
mongoose.connection.on('error', err => {
    console.error(err)
})