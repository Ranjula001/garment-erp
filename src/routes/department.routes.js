import express from "express";
import { getAllDepartments, getDepartmentByPk, createDepartment, updateDepartment, deleteDepartment } from "../controllers/department.controller.js";
import { departmentValidationRules } from "../validators/department.validator.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post("/", departmentValidationRules, validate, createDepartment);
router.get("/", getAllDepartments);
router.get("/:id", getDepartmentByPk);
router.put("/:id", departmentValidationRules, validate, updateDepartment);
router.delete("/:id", deleteDepartment);

export default router; // Use department routes