import { body, header, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express'

// וולידציה לשדות
export const habitValidation = [
  body('habitName').notEmpty().withMessage('HabitName is required'),
  body('frequency').notEmpty().isInt({ min: 1 }).withMessage('Frequency must be at least 1 '),
  body('time').notEmpty().withMessage('Time is required'),
  body('time').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Time must be in HH:mm format'),
  // header('userId').notEmpty().withMessage('UserId is required'),
  body('startDate').optional({ nullable: true }).isISO8601().withMessage('Start date must be a valid date'),
  body('startDate').optional({ nullable: true }).custom((value, { req }) => {
    if (value && req.body.endDate && new Date(value) > new Date(req.body.endDate)) {
      throw new Error('Start date must be before end date');
    }
    return true
  }).withMessage('Start date must be before end date'),
  body('endDate').optional({ nullable: true }).isISO8601().withMessage('End date must be a valid date'),

];

// middleware שמחזיר שגיאות אם יש
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // console.log("Validation passed");
  
  next();
};
// export default { habitValidation, validateRequest }
