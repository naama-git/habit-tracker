import { body, header, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express'
import Habit from '../../models/Habit';


// וולידציה לשדות
export const habitValidation = [
  body('habitName').notEmpty().withMessage('HabitName is required'),
  body('frequency').notEmpty().isInt({ min: 1 }).withMessage('Frequency must be at least 1 '),
  body('time').notEmpty().withMessage('Time is required'),
  body('time').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Time must be in HH:mm format'),
  body('startDate').optional({ nullable: true }).isISO8601().withMessage('Start date must be a valid date'),
  body('startDate').optional({ nullable: true }).custom((value, { req }) => {
    if (value && req.body.endDate && new Date(value) > new Date(req.body.endDate)) {
      throw new Error('Start date must be before end date');
    }
    return true
  }).withMessage('Start date must be before end date'),
  body('endDate').optional({ nullable: true }).isISO8601().withMessage('End date must be a valid date'),

];

// for updating
export const partialHabitVaildation = [
  body('frequency').optional({ nullable: true }).isInt({ min: 1 }).withMessage('Frequency must be at least 1 '),
  body('time').optional().matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Time must be in HH:mm format'),
  body('startDate').optional({ nullable: true }).isISO8601().withMessage('Start date must be a valid date'),
  body('startDate').optional({ nullable: true }).isISO8601().withMessage('Start date must be a valid ISO 8601 date format').toDate(),
  body('endDate').optional({ nullable: true }).isISO8601().withMessage('End date must be a valid ISO 8601 date format').toDate(),
  body('startDate')
    .custom(async (newStartDate, { req }) => {
      const { _id } = req.params;
      let relevantEndDate = req.body.endDate;
      if (!relevantEndDate) {
        const existingHabit = await Habit.findById(_id).select('endDate');
        if (existingHabit && existingHabit.endDate) {
          relevantEndDate = existingHabit.endDate; 
        }
      }
      if (newStartDate && relevantEndDate instanceof Date) {
        if (newStartDate.getTime() > relevantEndDate.getTime()) {
          throw new Error('Start date must be before end date (Current End Date: ' + relevantEndDate.toISOString().split('T')[0] + ')');
        }
      }

      return true;
    }),

    body('endDate')
    .custom(async (newEndDate, { req }) => {
      const { _id } = req.params;
      let relevantStartDate = req.body.startDate;
      if (!relevantStartDate) {
        const existingHabit = await Habit.findById(_id).select('startDate');
        if (existingHabit && existingHabit.startDate) {
          relevantStartDate = existingHabit.startDate; 
        }
      }
      if (newEndDate && relevantStartDate instanceof Date) {
        if (newEndDate.getTime() < relevantStartDate.getTime()) {
          throw new Error('Start date must be before end date (Current Start Date: ' + relevantStartDate.toISOString().split('T')[0] + ')');
        }
      }

      return true;
    }),
]


export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

