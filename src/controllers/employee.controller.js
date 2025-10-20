import { createEmpService, getAllEmpsService, getEmpByPkService, updateEmpService, deleteEmpService } from "../services/employee.services.js";

//CREATE
export const createEmployee = async (req, res) => {
  try {
    const newEmployee = await createEmpService(req.body);
    res.status(201).json({ message: "Employee created", employee: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating employee", error });
  }
};

//READ ALL
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await getAllEmpsService();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

//READ by ID
export const getEmployeeByPk = async (req, res) => {
    try {
        const employee = await getEmpByPkService(req.params.id);
        if (!employee) return res.status(404).json({message: "Employee not found"});
        res.status(200).json(employee);
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching employee", error });
    }
};

//UPDATE
export const updateEmployee = async (req, res)=>{
    try{
        const employee = await updateEmpService(req.params.id, req.body);
        res.status(200).json({message: "Employee updated", data: employee});
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating employee", error });
    }
};

//DELETE
export const deleteEmployee = async (req, res)=>{
    try{
        const employee = await deleteEmpService(req.params.id);
        res.status(200).json({message: "Employee deleted", data: employee});
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting employee", error });
    }
};