import express from "express";
import { getAllEmployees, getEmployeeByPk, createEmployee, updateEmployee, deleteEmployee } from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/", createEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeByPk);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;