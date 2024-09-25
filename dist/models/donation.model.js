"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationModel = void 0;
const sequelize_1 = require("sequelize");
exports.DonationModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT(),
        allowNull: false,
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER(),
        allowNull: false,
    },
    charity_id: {
        type: sequelize_1.DataTypes.INTEGER(),
        allowNull: false,
    },
};
