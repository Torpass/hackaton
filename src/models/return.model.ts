import { DataTypes } from "sequelize";

export const ReturnModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    delivery_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
};