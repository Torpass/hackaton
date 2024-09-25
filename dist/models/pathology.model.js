"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathologyModel = void 0;
const sequelize_1 = require("sequelize");
exports.PathologyModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
    },
};
