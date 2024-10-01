"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientModel = void 0;
const sequelize_1 = require("sequelize");
exports.PatientModel = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_card: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false,
    },
    birth_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false,
        unique: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING(512),
        allowNull: false,
    },
    gender: {
        type: sequelize_1.DataTypes.ENUM("femenino", "masculino", "other"),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
    },
    community_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    economic_status: {
        type: sequelize_1.DataTypes.ENUM("clase alta", "clase media alta", "clase media", "clase media baja", "clase baja", "no especificado"),
        allowNull: false,
    },
    vulnerability_level: {
        type: sequelize_1.DataTypes.ENUM("muy critico", "critico", "medio", "bajo", "no especificado"),
        allowNull: false,
    }
};
