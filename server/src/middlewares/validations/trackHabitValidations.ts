import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express'
import { ErrorApp } from '../../Interfaces/ErrorApp';

export const trackHabitValidation = [
    body('logDate').notEmpty().isISO8601().withMessage('log Date is required').toDate(),
    body('done').notEmpty().withMessage('Habit Done is required'),
    body('logDate').custom((value, { req }) => {
        console.log("startDate:", req.currentHabit.startDate, "value", value)
        console.log(typeof req.currentHabit.startDate, typeof value)
        if (req.currentHabit.startDate) {
            if (value > req.currentHabit.endDate || value < req.currentHabit.startDate) {
                throw new Error('Log date is outside the valid range for this habit.');
            }
        }
        else {
            if (value < req.currentHabit.startDate) {
                throw new Error(" Users can only mark a task as 'Completed' on or after its scheduled start date.");
            }
        }
        return true
    })


];
export const trackHabitValidationForUpdating = [
    body('done').notEmpty().withMessage("done is required")
]


export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsArr = errors.array()
        const reason = errorsArr.map(error => error.msg).join(' ')
        throw new ErrorApp(400, 'Habit validation failed', 'validateRequest', req.method as any, reason, req.originalUrl, errorsArr)
    }
    next();
};