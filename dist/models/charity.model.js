"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharityModel = void 0;
const sequelize_1 = require("sequelize");
exports.CharityModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
    },
    razon_social: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT(),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive", "deleted"),
        defaultValue: "active",
    },
    identification: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false,
    },
    indentification_type: {
        type: sequelize_1.DataTypes.ENUM("J", "V", "E", "G", "P", "M"),
        allowNull: false,
    },
    is_fundation: {
        type: sequelize_1.DataTypes.BOOLEAN(),
        allowNull: false,
    },
};
