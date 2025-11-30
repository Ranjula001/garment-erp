import express from "express";
import { getAllEmployees, getEmployeeByPk, createEmployee, updateEmployee, deleteEmployee } from "../controllers/employee.controller.js";
import { employeeValidationRules } from "../validators/employee.validator.js";
import { validate } from "../middlewares/validate.js";
import { authenticate, requirePermission, requireAdmin, requireManager } from "../middlewares/auth.js";
import { PERMISSIONS } from "../utils/rolePermissions.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Create employee - Admin and Manager only
router.post("/", requireManager, employeeValidationRules, validate, createEmployee);

// Read employees - All authenticated users
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeByPk);

// Update employee - Admin and Manager only
router.put("/:id", requireManager, employeeValidationRules, validate, updateEmployee);

// Delete employee - Admin only
router.delete("/:id", requireAdmin, deleteEmployee);

export default router;