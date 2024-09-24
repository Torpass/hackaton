import {sequelize} from "./db";
import {PatientInstance, MedicationExpirationInstance, DonationInstance, MedicationDonationInstance} from "../interfaces"
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
         MedicationExpirationDateModel,
         MedicationDisposalModel,
         MedicationDonationModel,
         DeliveryModel,
         DeliveryDetailsModel,
         ReturnModel,
         ReturnDetailsModel,
         AdminModel
      } from "../models";
import { TreatmentInstance } from "../interfaces";
import { DeliveryInstance } from "../interfaces/delivery.interface";
import { ReturnInstance } from "../interfaces/return.interface";

// CREAMOS LAS TABLAS
const CommunityDB = sequelize.define("community", CommunityModel, {timestamps: true} );
const CharityDB = sequelize.define("charity", CharityModel, {timestamps: true} );
const CategoryDB = sequelize.define("category", CategoryModel, {timestamps: true} );
const DonationDB = sequelize.define<DonationInstance>("donation", DonationModel, {timestamps: true} );
const PatientDB = sequelize.define<PatientInstance>("patient", PatientModel, {timestamps: true} );
const PathologyDB = sequelize.define("pathology", PathologyModel, {timestamps: true} );
const PathologyPatientDB = sequelize.define("pathology_patient", PathologyPatientModel, {timestamps: true} );
const TreatmentDB = sequelize.define<TreatmentInstance>("treatment", TreatmentModel, {timestamps: true} );
const MedicationDB = sequelize.define("medication", MedicationModel, {timestamps: true} );
const MedicationTreatmentDB = sequelize.define("medication_treatment", MedicationTreatmentModel, {timestamps: true} );
const MedicationPathologyDB = sequelize.define("medication_pathology", MedicationPathologyModel, {timestamps: true} );
const MedicationExpirationDateDB = sequelize.define<MedicationExpirationInstance>("medication_expiration_date", MedicationExpirationDateModel, {timestamps: true} );
const MedicationDisposalDB = sequelize.define("medication_disposal", MedicationDisposalModel, {timestamps: true} );
const MedicationDonationDB = sequelize.define<MedicationDonationInstance>("medication_donation", MedicationDonationModel, {timestamps: true} );
const DeliveryDB = sequelize.define<DeliveryInstance>("delivery", DeliveryModel, {timestamps: true} );
const DeliveryDetailsDB = sequelize.define("delivery_details", DeliveryDetailsModel, {timestamps: true} );
const ReturnDB = sequelize.define<ReturnInstance>("return", ReturnModel, {timestamps: true} );
const ReturnDetailsDB = sequelize.define("return_details", ReturnDetailsModel, {timestamps: true} );
const AdminDB = sequelize.define("admin", AdminModel, {timestamps: true} );

// Relaciones //

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

//un medicamento puede tener muchas fechas de vencimiento
MedicationDB.hasMany(MedicationExpirationDateDB, {foreignKey: 'medication_id', sourceKey: 'id'});
MedicationExpirationDateDB.belongsTo(MedicationDB, {foreignKey: 'medication_id', targetKey: 'id'});

//un medicamento puede tener muchas eliminaciones
MedicationDB.hasMany(MedicationDisposalDB, {foreignKey: 'medication_id', sourceKey: 'id'});
MedicationDisposalDB.belongsTo(MedicationDB, {foreignKey: 'medication_id', targetKey: 'id'});

//un medicamento puede tener muchas donaciones y una donacion puede tener muchos medicamentos
MedicationDB.belongsToMany(DonationDB, {through: MedicationDonationDB, foreignKey: 'medication_id'});
DonationDB.belongsToMany(MedicationDB, {through: MedicationDonationDB, foreignKey: 'donation_id'});

//un paciente puede tener muchas entregas de medicamentos y una entrega de medicamentos pertenece a un paciente
PatientDB.hasMany(DeliveryDB, {foreignKey: 'patient_id', sourceKey: 'id'});
DeliveryDB.belongsTo(PatientDB, {foreignKey: 'patient_id', targetKey: 'id'});

//un tratamiento puede tener muchas entregas de medicamentos y una entrega de medicamentos pertenece a un tratamiento
TreatmentDB.hasMany(DeliveryDB, {foreignKey: 'treatment_id', sourceKey: 'id'});
DeliveryDB.belongsTo(TreatmentDB, {foreignKey: 'treatment_id', targetKey: 'id'});

//una medicamento puede tener muchas entregas de medicamentos y una entrega de medicamentos puede tener muchos medicamentos
MedicationDB.belongsToMany(DeliveryDB, {through: DeliveryDetailsDB, foreignKey: 'medication_id'});
DeliveryDB.belongsToMany(MedicationDB, {through: DeliveryDetailsDB, foreignKey: 'delivery_id'});

//una entrega puede tener muchas devoluciones y una devolucion pertenece a una entrega
DeliveryDB.hasMany(ReturnDB, {foreignKey: 'delivery_id', sourceKey: 'id'});
ReturnDB.belongsTo(DeliveryDB, {foreignKey: 'delivery_id', targetKey: 'id'});


//una devolucion puede tener muchos medicamentos y un medicamento puede tener muchas devoluciones
ReturnDB.belongsToMany(MedicationDB, {through: ReturnDetailsDB, foreignKey: 'return_id'});
MedicationDB.belongsToMany(ReturnDB, {through: ReturnDetailsDB, foreignKey: 'medication_id'});


// // Sincroniza los modelos con la base de datos
const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error(error);
  }
};
syncModels();

export {
  sequelize,
  CommunityDB,
  CategoryDB,
  CharityDB,
  DonationDB,
  PatientDB,
  PathologyDB,
  PathologyPatientDB,
  TreatmentDB,
  MedicationDB,
  MedicationTreatmentDB,
  MedicationPathologyDB,
  MedicationExpirationDateDB,
  MedicationDisposalDB,
  MedicationDonationDB,
  DeliveryDB,
  DeliveryDetailsDB,
  ReturnDB,
  ReturnDetailsDB,
  AdminDB
};
