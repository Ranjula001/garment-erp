import {DataTypes} from 'sequelize';
import sequelize from './index.js';

const Employee = sequelize.define('Employee', {    //Creates a model (and corresponding table)
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,  //Means this column is required
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  //Prevents duplicate values (useful for email)
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

//Sequelize automatically adds these 'createdAt, updatedAt' timestamps

export default Employee;