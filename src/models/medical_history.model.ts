import { DataTypes } from "sequelize";

export const MedicalHistory = {
    id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
    },
    patient_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
    },
    url: {
        type: DataTypes.TEXT(),
        allowNull: false,
    },
}
