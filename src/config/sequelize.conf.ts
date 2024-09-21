import {sequelize} from "./db";
import {
    CommunityModel,
} from "../models";

// CREAMOS LAS TABLAS
const CommunityDB = sequelize.define("community", CommunityModel, {timestamps: true} );


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
};
