import { DataTypes } from "sequelize";

export const MedicationPathologyModel = {
    pathology_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    medication_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
};