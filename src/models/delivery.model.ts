import { DataTypes } from "sequelize";

export const DeliveryModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    appointment_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    withdrawal_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    treatment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
};