import Employee from "../models/employee.model.js";

//CREATE
export const createEmpService = async (employeeData) => {
    return await Employee.create(employeeData);
};

//READ ALL
export const getAllEmpsService = async () => {
    return await Employee.findAll();
};

//READ by ID
export const getEmpByPkService = async (id) =>{
    return await Employee.findByPk(id);
};

//UPDATE
export const updateEmpService = async (id, updateData) => {
    const employee = await Employee.findByPk(id);
    if (!employee) throw new Error('404 Employee not found');
    return await employee.update(updateData);
};

//DELETE
export const deleteEmpService = async (id) => {
    const employee = await Employee.findByPk(id);
    if (!employee) throw new Error('404 Employee not found');
    return await employee.destroy();
};



//These are the DB Logic functions for Employee entity