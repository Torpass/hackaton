import { DataTypes } from "sequelize";

export const MedicationTreatmentModel = {
    treatment_id: {
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