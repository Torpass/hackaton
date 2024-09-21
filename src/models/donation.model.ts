import { DataTypes } from "sequelize";

export const DonationModel = {
    id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT(),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("procesado", "pendiente", "cancelado"),
        defaultValue: "pendiente",
    },
    category_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
    },
    charity_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
    },
}
