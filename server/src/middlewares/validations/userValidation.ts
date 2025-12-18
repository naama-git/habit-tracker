import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express'
import User from '../../models/User';
import logger from '../../config/logger';
import { ErrorApp } from '../../Interfaces/ErrorApp';


export const userValidation = [
  body('userName').notEmpty().withMessage('UserName is required'),
  body('email').notEmpty().withMessage('Email is required'),
  body('email').isEmail().withMessage('Email must be a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  body('userName').custom(async (value) => {
    const existingUser = await User.findOne({ userName: value }).lean()
    if (existingUser) {
      throw new Error('UserName already exists')
    }
  }).withMessage('UserName already exists')

];

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArr = errors.array()
    const reason = errorsArr.map(error => error.msg).join(' ')
    throw new ErrorApp(400, 'User validation failed', 'validateRequest', req.method as any, reason, req.originalUrl,errorsArr)
  }
  next();
};