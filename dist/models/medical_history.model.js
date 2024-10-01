"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalHistory = void 0;
const sequelize_1 = require("sequelize");
exports.MedicalHistory = {
    id: {
        type: sequelize_1.DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
    },
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER(),
        allowNull: false,
    },
    url: {
        type: sequelize_1.DataTypes.TEXT(),
        allowNull: false,
    },
};
