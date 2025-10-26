import { createDeptService, getAllDeptsService, getDeptByPkService, updateDeptService, deleteDeptService } from "../services/department.services";

//CREATE
export const createDepartment = async (req, res) => {
    try{
        const newDepartment = await createDeptService(req.body);
        res.status(201).json({ message: "Department created", data: newDepartment });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating department", error });
    }
};

//READ ALL
export const getAllDepartments = async (req, res) => {
    try{
        const departments = await getAllDeptsService();
        res.status(200).json(departments);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching all departments", error });
    }
};

//READ by ID
export const getDepartmentByPk = async (req, res) => {
    try{
        const department = await getDeptByPkService(req.params.id);
        if(!department) return res.status(404).json({message: "Department not found"});
        res.status(200).json(department);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching department by ID", error });
    }
};

//UPDATE
export const updateDepartment = async (req, res) => {
    try{
        const updateDept = await updateDeptService(req.params.id, req.body);
        res.status(200).json({ message: "Department updated", data: updateDept });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating department", error });
    }
};

//DELETE
export const deleteDepartment = async (req, res) => {
    try{
        const deletedDept = await deleteDeptService(req.params.id);
        res.status(200).json({ message: "Department deleted", data: deletedDept });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting department", error });
    }
};