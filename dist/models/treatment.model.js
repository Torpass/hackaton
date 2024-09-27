"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentModel = void 0;
const sequelize_1 = require("sequelize");
exports.TreatmentModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    observation: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("no abastecido", "parcialmente abastecido", "abastecido"),
        defaultValue: "no abastecido",
    },
    active: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive", "deleted"),
        defaultValue: "active",
    },
};
