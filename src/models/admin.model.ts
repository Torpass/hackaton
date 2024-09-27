import { DataTypes } from "sequelize";

export const AdminModel = {
  id: {
    type: DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cedula: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive", "deleted"),
    defaultValue: "active",
  },
  userType: {
    type: DataTypes.ENUM("admin", "donor"),
    defaultValue: "donor",
  },
};
