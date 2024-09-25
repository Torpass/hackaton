"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnModel = void 0;
const sequelize_1 = require("sequelize");
exports.ReturnModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    reason: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    delivery_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
};
