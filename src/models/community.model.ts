import { DataTypes } from "sequelize";

export const CommunityModel = {
  id: {
    type: DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  region: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive", "deleted"),
    defaultValue: "active",
  },
};