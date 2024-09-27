"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationTreatmentModel = void 0;
const sequelize_1 = require("sequelize");
exports.MedicationTreatmentModel = {
    treatment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    medication_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
};
