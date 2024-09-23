import { DataTypes } from "sequelize";

export const TreatmentModel = {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    observation: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM("no abastecido", "parcialmente abastecido", "abastecido"),
        defaultValue: "no abastecido",
    },
    active: {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
        defaultValue: "active",
      },
};