import { createEmpService, getAllEmpsService, getEmpByPkService, updateEmpService, deleteEmpService } from "../services/employee.services.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { NotFoundError } from "../utils/customErrors.js";

//CREATE
export const createEmployee = asyncHandler(async (req, res) => {
  const newEmployee = await createEmpService(req.body);
  res.status(201).json({ message: "Employee created", employee: newEmployee });
});

//READ ALL
export const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await getAllEmpsService();
  res.status(200).json(employees);
});

//READ by ID
export const getEmployeeByPk = asyncHandler(async (req, res) => {
  const employee = await getEmpByPkService(req.params.id);
  if (!employee) throw new NotFoundError("Employee not found");
  res.status(200).json(employee);
});

//UPDATE
export const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await updateEmpService(req.params.id, req.body);
  res.status(200).json({message: "Employee updated", data: employee});
});

//DELETE
export const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await deleteEmpService(req.params.id);
  res.status(200).json({message: "Employee deleted", data: employee});
});
