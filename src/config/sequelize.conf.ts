import {sequelize} from "./db";
import {
    CommunityModel,
} from "../models";
import { CategoryModel } from "../models/category.model";

// CREAMOS LAS TABLAS
const CommunityDB = sequelize.define("community", CommunityModel, {timestamps: true} );
const CategoryDB = sequelize.define("category", CategoryModel, {timestamps: true} );

// Relaciones



// Sincroniza los modelos con la base de datos
const syncModels = async () => {
  await sequelize.sync({ alter: true });
  try {
    
  } catch (error) {
    console.error(error);
  }
};
syncModels();

//export default db;

export {
  sequelize,
  CommunityDB,
  CategoryDB,
};
