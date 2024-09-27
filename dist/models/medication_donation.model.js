"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationDonationModel = void 0;
const sequelize_1 = require("sequelize");
exports.MedicationDonationModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    medication_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    donation_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    expiration_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    }
};
