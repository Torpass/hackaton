"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnDetailsModel = void 0;
const sequelize_1 = require("sequelize");
exports.ReturnDetailsModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    return_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    medication_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Medications', // Nombre de la tabla de medicinas
            key: 'id'
        }
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
