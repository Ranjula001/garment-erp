import { createDeptService, getAllDeptsService, getDeptByPkService, updateDeptService, deleteDeptService } from "../services/department.services.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { NotFoundError } from "../utils/customErrors.js";

//CREATE
export const createDepartment = asyncHandler(async (req, res) => {
  const newDepartment = await createDeptService(req.body);
  res.status(201).json({ message: "Department created", data: newDepartment });
});

//READ ALL
export const getAllDepartments = asyncHandler(async (req, res) => {
  const departments = await getAllDeptsService();
  res.status(200).json(departments);
});

//READ by ID
export const getDepartmentByPk = asyncHandler(async (req, res) => {
  const department = await getDeptByPkService(req.params.id);
  if (!department) throw new NotFoundError("Department not found");
  res.status(200).json(department);
});

//UPDATE
export const updateDepartment = asyncHandler(async (req, res) => {
  const updateDept = await updateDeptService(req.params.id, req.body);
  res.status(200).json({ message: "Department updated", data: updateDept });
});

//DELETE
export const deleteDepartment = asyncHandler(async (req, res) => {
  const deletedDept = await deleteDeptService(req.params.id);
  res.status(200).json({ message: "Department deleted", data: deletedDept });
});
