"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const sequelize_1 = require("sequelize");
exports.CategoryModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT(),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive", "deleted"),
        defaultValue: "active",
    },
};
