import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express'
import User from '../../models/HabitLog';


export const trackHabitValidation = [
    body('logDate').notEmpty().isISO8601().withMessage('log Date is required').toDate(),
    body('done').notEmpty().withMessage('Is Habit Done is required'),
    body('logDate').custom((value, { req }) => {
        if (req.req.currentHabit.endDate) {
            if (value > req.req.currentHabit.endDate || value < req.currentHabit.startDate) {
                throw new Error('Log date is outside the valid range for this habit.');
            }
        }
        else{
             if (value < req.currentHabit.startDate) {
                throw new Error(" Users can only mark a task as 'Completed' on or after its scheduled start date.");
            }
        }
    })


];


export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // console.log("Validation passed");

    next();
};