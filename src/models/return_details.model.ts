import { DataTypes } from "sequelize";

export const ReturnDetailsModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    return_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    medication_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Medications', // Nombre de la tabla de medicinas
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
};