import { body } from "express-validator";

export const departmentValidationRules = [
    body('name')
        .isString().withMessage('Department name must be a string')
        .notEmpty().withMessage('Department name is required'),
        
    body('status')
        .notEmpty().withMessage('Status is required'),

    body('description')
        .optional()
        .isString().withMessage('Description must be a string')
];