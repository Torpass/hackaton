"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const sequelize_1 = require("sequelize");
exports.AdminModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    cedula: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive", "deleted"),
        defaultValue: "active",
    },
    userType: {
        type: sequelize_1.DataTypes.ENUM("admin", "donor"),
        defaultValue: "donor",
    },
};
