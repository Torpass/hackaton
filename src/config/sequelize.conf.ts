import {sequelize} from "./db";
import { CategoryModel, 
         CommunityModel, 
         CharityModel, 
         DonationModel,
         PatientModel, 
         PathologyModel,
         PathologyPatientModel,
         TreatmentModel,
         MedicationModel,
         MedicationTreatmentModel,
         MedicationPathologyModel,
      } from "../models";

// CREAMOS LAS TABLAS
const CommunityDB = sequelize.define("community", CommunityModel, {timestamps: true} );
const CharityDB = sequelize.define("charity", CharityModel, {timestamps: true} );
const CategoryDB = sequelize.define("category", CategoryModel, {timestamps: true} );
const DonationDB = sequelize.define("donation", DonationModel, {timestamps: true} );
const PatientDB = sequelize.define("patient", PatientModel, {timestamps: true} );
const PathologyDB = sequelize.define("pathology", PathologyModel, {timestamps: true} );
const PathologyPatientDB = sequelize.define("pathology_patient", PathologyPatientModel, {timestamps: true} );
const TreatmentDB = sequelize.define("treatment", TreatmentModel, {timestamps: true} );
const MedicationDB = sequelize.define("medication", MedicationModel, {timestamps: true} );
const MedicationTreatmentDB = sequelize.define("medication_treatment", MedicationTreatmentModel, {timestamps: true} );
const MedicationPathologyDB = sequelize.define("medication_pathology", MedicationPathologyModel, {timestamps: true} );

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

//un tratamiento puede tener muchos medicamentos y un medicamento puede pertenecer a muchos tratamientos
TreatmentDB.belongsToMany(MedicationDB, {through: MedicationTreatmentDB, foreignKey: 'treatment_id'});
MedicationDB.belongsToMany(TreatmentDB, {through: MedicationTreatmentDB, foreignKey: 'medication_id'});

//un tratamiento pertenece a un paciente
PatientDB.hasMany(TreatmentDB, {foreignKey: 'patient_id', sourceKey: 'id'});
TreatmentDB.belongsTo(PatientDB, {foreignKey: 'patient_id', targetKey: 'id'});

//un medicamento puede tener muchas patologias y una patologia puede tener muchos medicamentos
MedicationDB.belongsToMany(PathologyDB, {through: MedicationPathologyDB, foreignKey: 'medication_id'});
PathologyDB.belongsToMany(MedicationDB, {through: MedicationPathologyDB, foreignKey: 'pathology_id'});


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
