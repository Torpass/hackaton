import {sequelize} from "./db";
import { CategoryModel, 
         CommunityModel, 
         CharityModel, 
         DonationModel,
         PatientModel, 
         PathologyModel,
         PathologyPatientModel} from "../models";

// CREAMOS LAS TABLAS
const CommunityDB = sequelize.define("community", CommunityModel, {timestamps: true} );
const CharityDB = sequelize.define("charity", CharityModel, {timestamps: true} );
const CategoryDB = sequelize.define("category", CategoryModel, {timestamps: true} );
const DonationDB = sequelize.define("donation", DonationModel, {timestamps: true} );
const PatientDB = sequelize.define("patient", PatientModel, {timestamps: true} );
const PathologyDB = sequelize.define("pathology", PathologyModel, {timestamps: true} );
const PathologyPatientDB = sequelize.define("pathology_patient", PathologyPatientModel, {timestamps: true} );

// Relaciones

//una categoria puede tener muchas donaciones y una donacion pertenece a una categoria
CategoryDB.hasMany(DonationDB, {foreignKey: 'category_id', sourceKey: 'id'});
DonationDB.belongsTo(CategoryDB, {foreignKey: 'category_id', targetKey: 'id'});

//una caridad puede tener muchas donaciones y una donacion pertenece a una caridad
CharityDB.hasMany(DonationDB, {foreignKey: 'charity_id', sourceKey: 'id'});
DonationDB.belongsTo(CharityDB, {foreignKey: 'charity_id', targetKey: 'id'});

//una comunidad puede tener muchos pacientes y un paciente pertenece a una comunidad
CommunityDB.hasMany(PatientDB, {foreignKey: 'community_id', sourceKey: 'id'});
PatientDB.belongsTo(CommunityDB, {foreignKey: 'community_id', targetKey: 'id'});

//un paciente puede tener muchas patologias y una patologia puede pertenecer a muchos pacientes
PatientDB.belongsToMany(PathologyDB, {through: PathologyPatientDB, foreignKey: 'patient_id'});
PathologyDB.belongsToMany(PatientDB, {through: PathologyPatientDB, foreignKey: 'pathology_id'}); 

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
  PatientDB,
  PathologyDB,
  PathologyPatientDB
};
