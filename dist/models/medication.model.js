"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationModel = void 0;
const sequelize_1 = require("sequelize");
exports.MedicationModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
};
