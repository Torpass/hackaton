"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathologyPatientModel = void 0;
const sequelize_1 = require("sequelize");
exports.PathologyPatientModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    pathology_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
};
