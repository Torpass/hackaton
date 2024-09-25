"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationPathologyModel = void 0;
const sequelize_1 = require("sequelize");
exports.MedicationPathologyModel = {
    pathology_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    medication_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
};
