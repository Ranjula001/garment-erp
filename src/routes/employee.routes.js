import express from "express";
import { getAllEmployees, getEmployeeByPk, createEmployee, updateEmployee, deleteEmployee } from "../controllers/employee.controller.js";
import { employeeValidationRules } from "../validators/employee.validator.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post("/", employeeValidationRules, validate, createEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeByPk);
router.put("/:id", employeeValidationRules, validate, updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;