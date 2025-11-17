"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.habitValidation = void 0;
const express_validator_1 = require("express-validator");
// וולידציה לשדות
exports.habitValidation = [
    (0, express_validator_1.body)('habitName').notEmpty().withMessage('HabitName is required'),
    (0, express_validator_1.body)('frequency').notEmpty().isInt({ min: 1 }).withMessage('Frequency must be at least 1 '),
    (0, express_validator_1.body)('time').notEmpty().withMessage('Time is required'),
    (0, express_validator_1.body)('time').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Time must be in HH:MM format'),
    (0, express_validator_1.body)('userId').notEmpty().withMessage('UserId is required'),
    (0, express_validator_1.body)('startDate').optional({ nullable: true }).isISO8601().withMessage('Start date must be a valid date'),
    (0, express_validator_1.body)('startDate').optional({ nullable: true }).custom((value, { req }) => {
        if (value && req.body.endDate && new Date(value) > new Date(req.body.endDate)) {
            throw new Error('Start date must be before end date');
        }
        return true;
    }).withMessage('Start date must be before end date'),
    (0, express_validator_1.body)('endDate').optional({ nullable: true }).isISO8601().withMessage('End date must be a valid date'),
];
// middleware שמחזיר שגיאות אם יש
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // console.log("Validation passed");
    next();
};
exports.validateRequest = validateRequest;
// export default { habitValidation, validateRequest }
//# sourceMappingURL=habitValidations.js.map