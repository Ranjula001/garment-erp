import Employee from './employee.model.js';
import Department from './department.model.js';
import User from './user.model.js';

// Define associations
Employee.belongsTo(Department, { 
    foreignKey: 'departmentId',
    as: 'department'
});

Department.hasMany(Employee, { 
    foreignKey: 'departmentId',
    as: 'employees'
});

export { Employee, Department, User };