import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";
import { use } from "react";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true,
        validate: {
            len: [4, 20],
        },
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique : true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100],
        },
    },
    role: {
        type: DataTypes.ENUM('super-admin','admin', 'user', 'manager'),
        allowNull: false,
        defaultValue: 'user',
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
    }
});

//Hash password before saving
User.beforeCreate(async (user) => {
    if(user.password){
        user.password = await bcrypt.hash(user.password, 12);
    }
});

//Hash password before updating
User.beforeUpdate(async (user) => {
    if(user.password){
        user.password = await bcrypt.hash(user.password, 12);
    }
});

//Instance method to check password
User.prototype.checkPassword = async function (candidatepassword) {
    return await bcrypt.compare(candidatepassword, this.password);
};

export default User;