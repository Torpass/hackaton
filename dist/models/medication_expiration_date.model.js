"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationExpirationDateModel = void 0;
const sequelize_1 = require("sequelize");
exports.MedicationExpirationDateModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    medication_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    expiration_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
};
