import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express'
import Habit from '../../models/Habit';


// validation for creating a habit
export const habitValidation = [
  body('habitName').notEmpty().withMessage('HabitName is required'),
  body('frequency').notEmpty().withMessage('Frequency is requiered'),

  // validation for daysInWeek when frequency is weekly
  body('daysInWeek')
    .custom((value, { req }) => {
      const frequency = req.body.frequency ? req.body.frequency.toLowerCase() : '';

      if (frequency === 'weekly') {
        if (!Array.isArray(value) || value.length === 0) {
          throw new Error('You must select at least one day of the week when frequency is weekly');
        }
        value.forEach((element: number) => {
          if (element < 0 || element > 6) {
            throw new Error('Days in week must be between 0 (Sunday) and 6 (Saturday)');
          }
        });
      }
      else {

        if (value && value.length > 0) {
          throw new Error(`Days in week should not be provided when frequency is ${frequency || 'other'}`);
        }
      }
      return true;
    }),

  // validation for daysInMonth when frequency is monthly
  body('daysInMonth')
    .custom((value, { req }) => {
      const frequency = req.body.frequency ? req.body.frequency.toLowerCase() : '';

      if (frequency === 'monthly') {
        if (!value.length) {
          throw new Error('You must select at least one day of the month when frequency is monthly');
        }
        value.forEach((element: number) => {
          if (element < 1 || element > 31) {
            throw new Error('Days in month must be between 1 and 31 ');
          }
        });

      }

      else {
        if (value) {
          throw new Error(`Days in month should not be provided when frequency is ${frequency || 'other'}`);
        }
      }
      return true;
    })
  ,

  body('time').notEmpty().withMessage('Time is required'),
  body('time').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Time must be in HH:mm format'),
  body('startDate').optional({ nullable: true }).isDate().withMessage('Start date must be a valid date'),
  body('startDate').optional({ nullable: true }).custom((value, { req }) => {
    const dateValue = new Date(value)
    if (dateValue >= new Date()) {
      if (value && req.body.endDate && new Date(value) > new Date(req.body.endDate)) {
        throw new Error('Start date must be before end date');
      }
    }
    else {
      throw new Error('Start date must at least today');
    }

    return true
  }),
  body('endDate').optional({ nullable: true }).isDate().withMessage('End date must be a valid date'),

];

// ----------------------------------------------------------------------------
// for updating
export const partialHabitVaildation = [
  body('daysInWeek').optional()
    .custom((value, { req }) => {
      const frequency = req.body.frequency ? req.body.frequency.toLowerCase() : '';
      const currentHabit = req.currentHabit;

      // if the frequency was changed to weekly
      if (currentHabit.frequency !== frequency && frequency) {
        if (frequency === "weekly") {
          if (!Array.isArray(value) || value.length === 0) {
            throw new Error('You must select at least one day of the week when frequency is weekly');
          }
          value.forEach((element: number) => {
            if (element < 0 || element > 6) {
              throw new Error('Days in week must be between 0 (Sunday) and 6 (Saturday)');
            }
          });
        }
        // if the frequency is not weekly, you can't send days in week
        else {
          if (value && value.length > 0) {
            throw new Error(`Days in week should not be provided when frequency is ${frequency || 'other'}`);
          }
        }
      }

      return true;
    }),

  // validation for daysInMonth when frequency is monthly
  body('daysInMonth').optional()
    .custom((value, { req }) => {
      const frequency = req.body.frequency ? req.body.frequency.toLowerCase() : '';
      const currentHabit = req.currentHabit;

      // if the frequency was changed to monthly
      if (frequency && frequency !== currentHabit.frequency) {
        if (frequency === 'monthly') {
          if (!value.length) {
            throw new Error('You must select at least one day of the month when frequency is monthly');
          }
          value.forEach((element: number) => {
            if (element < 1 || element > 31) {
              throw new Error('Days in month must be between 1 and 31 ');
            }
          });

        }
        else {
          // if the frequency is not monthly, you can't send days in month
          if (value) {
            throw new Error(`Days in month should not be provided when frequency is ${frequency || 'other'}`);
          }
        }
      }

      return true;
    })
  ,
  body('time').optional().matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Time must be in HH:mm format'),
  body('startDate').optional({ nullable: true }).isDate().withMessage('Start date must be a valid date').toDate(),
  body('endDate').optional({ nullable: true }).isDate().withMessage('End date must be a valid date').toDate(),
  body('startDate')
    .custom((newStartDate, { req }) => {
      if (!newStartDate) return true
      const dateValue = new Date(newStartDate)
      if (dateValue >= new Date()) {
        const currentHabit = req.currentHabit;
        let relevantEndDate = req.body.endDate;
        if (!relevantEndDate) {//if the user didnt update the end date
          if (currentHabit && currentHabit.endDate) {//if there is end date in current habit
            relevantEndDate = currentHabit.endDate;
          }
        }
        if (dateValue.getTime() >= relevantEndDate.getTime()) {
          throw new Error('Start date must be before end date (Current End Date: ' + relevantEndDate.toISOString().split('T')[0] + ')');
        }

      }
      else {
        throw new Error('Start date must at least today');
      }
      return true;
    }),

  body('endDate')
    .custom((newEndDate, { req }) => {
      if (!newEndDate) return true
      const dateValue = new Date(newEndDate)
      const currentHabit = req.currentHabit;
      let relevantStartDate = req.body.startDate
      if (!relevantStartDate) {
        if (currentHabit && currentHabit.startDate) {//always
          relevantStartDate = currentHabit.startDate;
        }
      }
      if (dateValue.getTime() < relevantStartDate.getTime()) {
        throw new Error('Start date must be before end date (Current Start Date: ' + relevantStartDate.toISOString().split('T')[0] + ')');
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

