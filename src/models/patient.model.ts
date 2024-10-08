import { DataTypes } from "sequelize";

export const PatientModel = {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_card: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    first_name: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },

    address: {
        type: DataTypes.STRING(512),
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM("femenino", "masculino", "other"),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
    },
    community_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    economic_status: {
        type: DataTypes.ENUM("clase alta", "clase media alta", "clase media", "clase media baja", "clase baja", "no especificado"),
        allowNull: false,
    },
    vulnerability_level: {
        type: DataTypes.ENUM("muy critico", "critico", "medio", "bajo", "no especificado"),
        allowNull: false,
    }
};