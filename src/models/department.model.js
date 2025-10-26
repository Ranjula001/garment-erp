import { DataTypes } from "sequelize";
import sequelize from "./index.js";

const Department = sequelize.define('Department', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true,
    }
});

export default Department;