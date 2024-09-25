import { DataTypes } from "sequelize";

export const DonationModel = {
    id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.TEXT(),
        allowNull: false,
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
