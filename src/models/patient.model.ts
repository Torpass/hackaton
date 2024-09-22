import { DataTypes } from "sequelize";

export const PatientModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    id_card: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
    },
    community_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
};