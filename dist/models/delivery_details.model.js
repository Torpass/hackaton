"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryDetailsModel = void 0;
const sequelize_1 = require("sequelize");
exports.DeliveryDetailsModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    delivery_id: {
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
