import { DataTypes } from "sequelize";

export const DeliveryDetailsModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    delivery_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    medication_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
};