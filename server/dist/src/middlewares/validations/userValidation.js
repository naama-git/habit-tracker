"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.userValidation = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../../models/User"));
// וולידציה לשדות
exports.userValidation = [
    (0, express_validator_1.body)('userName').notEmpty().withMessage('UserName is required'),
    (0, express_validator_1.body)('email').notEmpty().withMessage('Email is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Email must be a valid email address'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
    (0, express_validator_1.body)('userName').custom(async (value) => {
        const existingUser = await User_1.default.findOne({ userName: value }).lean();
        if (existingUser) {
            throw new Error('UserName already exists');
        }
    }).withMessage('UserName already exists')
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
//# sourceMappingURL=userValidation.js.map