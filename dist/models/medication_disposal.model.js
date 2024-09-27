"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationDisposalModel = void 0;
const sequelize_1 = require("sequelize");
exports.MedicationDisposalModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    medication_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    reason: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
};
