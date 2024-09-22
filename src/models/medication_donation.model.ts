import { DataTypes } from "sequelize";

export const MedicationDonationModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    medication_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    donation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
};