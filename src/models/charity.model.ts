import { DataTypes } from "sequelize";

export const CharityModel = {
  id: {
    type: DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true,
  },
  razon_social: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive", "deleted"),
    defaultValue: "active",
  },
  identification:{
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  indentification_type:{
    type: DataTypes.ENUM("J", "V", "E", "G", "P", "M"),
    allowNull: false,
  },
  is_fundation:{
    type: DataTypes.BOOLEAN(),
    allowNull: false,
  },
};