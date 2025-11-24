import Department from "../models/department.model.js";
import Employee from "../models/employee.model.js";

//CREATE
export const createDeptService = async (departmentData) => {
    return await Department.create(departmentData);
};

//READ ALL
export const getAllDeptsService = async () => {
    return await Department.findAll({
        include: [{
            model: Employee,
            as: 'employees',
            attributes: ['id', 'firstName', 'lastName', 'email', 'role']
        }]
    });
};

//READ by ID
export const getDeptByPkService = async (id) =>{
    return await Department.findByPk(id, {
        include: [{
            model: Employee,
            as: 'employees',
            attributes: ['id', 'firstName', 'lastName', 'email', 'role']
        }]
    });
};

//UPDATE
export const updateDeptService = async (id, updateData) => {
    const department = await Department.findByPk(id);
    if (!department) throw new Error('404 Department not found');
    return await department.update(updateData);
};

//DELETE
export const deleteDeptService = async (id) => {
    const department = await Department.findByPk(id);
    if (!department) throw new Error('404 Department not found');
    return await department.destroy();
};