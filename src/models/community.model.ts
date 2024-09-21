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
    unique: true,
  },
  region: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive", "deleted"),
    defaultValue: "active",
  },
};