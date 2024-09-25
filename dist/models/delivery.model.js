"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryModel = void 0;
const sequelize_1 = require("sequelize");
exports.DeliveryModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    appointment_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    withdrawal_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    treatment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    expiration_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("entregado", "pendiente", "vencido", "eliminado"),
        defaultValue: "pendiente",
    },
};
