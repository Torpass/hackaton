"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityModel = void 0;
const sequelize_1 = require("sequelize");
exports.CommunityModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false,
    },
    region: {
        type: sequelize_1.DataTypes.TEXT(),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive", "deleted"),
        defaultValue: "active",
    },
};
