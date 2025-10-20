import { body } from "express-validator";

export const employeeValidationRules = [
    body("firstName")
        .notEmpty().withMessage("First name is required")
        .isString().withMessage("Name must be a string")
        .isLength({min:2}).withMessage("First name must be at least 2 characters long"),
    body("lastName")
        .notEmpty().withMessage("Last name is required")
        .isString().withMessage("Last name must be a string")
        .isLength({min:2}).withMessage("Last name must be at least 2 characters long"),
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email address"),
    body("role")
        .notEmpty().withMessage("Role is required")
        .isIn(["Super Admin", "Admin", "Manager", "Production Manager", "Inventory Manager", "Sales Manager"]).withMessage("Invalid role"),
    body("salary")
        .notEmpty().withMessage("Salary is required")
        .isInt({min:0}).withMessage("Salary must be a positive integer"),
    body("status")
        .notEmpty().withMessage("Status is required")
        .isIn(["active", "inactive", "On Leave"]).withMessage("Invalid status")
];