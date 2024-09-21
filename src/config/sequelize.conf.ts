import {sequelize} from "./db";
import { CategoryModel, CommunityModel, CharityModel, DonationModel} from "../models";

// CREAMOS LAS TABLAS
const CommunityDB = sequelize.define("community", CommunityModel, {timestamps: true} );
const CharityDB = sequelize.define("charity", CharityModel, {timestamps: true} );
const CategoryDB = sequelize.define("category", CategoryModel, {timestamps: true} );
const DonationDB = sequelize.define("donation", DonationModel, {timestamps: true} );

// Relaciones
CategoryDB.hasMany(DonationDB, {foreignKey: 'category_id', sourceKey: 'id'});
DonationDB.belongsTo(CategoryDB, {foreignKey: 'category_id', targetKey: 'id'});

CharityDB.hasMany(DonationDB, {foreignKey: 'charity_id', sourceKey: 'id'});
DonationDB.belongsTo(CharityDB, {foreignKey: 'charity_id', targetKey: 'id'});


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
  CharityDB,
  DonationDB,
};
