import express from "express";
import { getAllDepartments, getDepartmentByPk, createDepartment, updateDepartment, deleteDepartment } from "../controllers/department.controller.js";
import { departmentValidationRules } from "../validators/department.validator.js";
import { validate } from "../middlewares/validate.js";
import { authenticate, requireAdmin, requireManager } from "../middlewares/auth.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Create department - Admin only
router.post("/", requireAdmin, departmentValidationRules, validate, createDepartment);

// Read departments - All authenticated users
router.get("/", getAllDepartments);
router.get("/:id", getDepartmentByPk);

// Update department - Admin and Manager only
router.put("/:id", requireManager, departmentValidationRules, validate, updateDepartment);

// Delete department - Admin only
router.delete("/:id", requireAdmin, deleteDepartment);

export default router;