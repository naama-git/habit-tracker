import express, { Request, Response } from 'express';
import { userValidation, validateRequest } from '../middlewares/validations/userValidation'
const router = express.Router()


import userController from '../controllers/userController'


router.post("/signup",userValidation,validateRequest, userController.signin)
router.post("/login", userController.login)

export default router