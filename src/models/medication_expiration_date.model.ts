import { DataTypes } from "sequelize";

export const MedicationExpirationDateModel = {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    medication_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expirationd_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
};