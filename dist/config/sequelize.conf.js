"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDB = exports.ReturnDetailsDB = exports.ReturnDB = exports.DeliveryDetailsDB = exports.DeliveryDB = exports.MedicationDonationDB = exports.MedicationDisposalDB = exports.MedicationExpirationDateDB = exports.MedicationPathologyDB = exports.MedicationTreatmentDB = exports.MedicationDB = exports.TreatmentDB = exports.PathologyPatientDB = exports.PathologyDB = exports.MedicalHistoryDB = exports.PatientDB = exports.DonationDB = exports.CharityDB = exports.CategoryDB = exports.CommunityDB = exports.sequelize = void 0;
const db_1 = require("./db");
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return db_1.sequelize; } });
const models_1 = require("../models");
const medical_history_model_1 = require("../models/medical_history.model");
// CREAMOS LAS TABLAS
const CommunityDB = db_1.sequelize.define("community", models_1.CommunityModel, {
    timestamps: true,
});
exports.CommunityDB = CommunityDB;
const CharityDB = db_1.sequelize.define("charity", models_1.CharityModel, {
    timestamps: true,
});
exports.CharityDB = CharityDB;
const CategoryDB = db_1.sequelize.define("category", models_1.CategoryModel, {
    timestamps: true,
});
exports.CategoryDB = CategoryDB;
const DonationDB = db_1.sequelize.define("donation", models_1.DonationModel, { timestamps: true });
exports.DonationDB = DonationDB;
const PatientDB = db_1.sequelize.define("patient", models_1.PatientModel, {
    timestamps: true,
});
exports.PatientDB = PatientDB;
const MedicalHistoryDB = db_1.sequelize.define("history", medical_history_model_1.MedicalHistory, {
    timestamps: true,
});
exports.MedicalHistoryDB = MedicalHistoryDB;
const PathologyDB = db_1.sequelize.define("pathology", models_1.PathologyModel, { timestamps: true });
exports.PathologyDB = PathologyDB;
const PathologyPatientDB = db_1.sequelize.define("pathology_patient", models_1.PathologyPatientModel, { timestamps: true });
exports.PathologyPatientDB = PathologyPatientDB;
const TreatmentDB = db_1.sequelize.define("treatment", models_1.TreatmentModel, { timestamps: true });
exports.TreatmentDB = TreatmentDB;
const MedicationDB = db_1.sequelize.define("medication", models_1.MedicationModel, { timestamps: true });
exports.MedicationDB = MedicationDB;
const MedicationTreatmentDB = db_1.sequelize.define("medication_treatment", models_1.MedicationTreatmentModel, { timestamps: true });
exports.MedicationTreatmentDB = MedicationTreatmentDB;
const MedicationPathologyDB = db_1.sequelize.define("medication_pathology", models_1.MedicationPathologyModel, { timestamps: true });
exports.MedicationPathologyDB = MedicationPathologyDB;
const MedicationExpirationDateDB = db_1.sequelize.define("medication_expiration_date", models_1.MedicationExpirationDateModel, { timestamps: true });
exports.MedicationExpirationDateDB = MedicationExpirationDateDB;
const MedicationDisposalDB = db_1.sequelize.define("medication_disposal", models_1.MedicationDisposalModel, { timestamps: true });
exports.MedicationDisposalDB = MedicationDisposalDB;
const MedicationDonationDB = db_1.sequelize.define("medication_donation", models_1.MedicationDonationModel, { timestamps: true });
exports.MedicationDonationDB = MedicationDonationDB;
const DeliveryDB = db_1.sequelize.define("delivery", models_1.DeliveryModel, { timestamps: true });
exports.DeliveryDB = DeliveryDB;
const DeliveryDetailsDB = db_1.sequelize.define("delivery_details", models_1.DeliveryDetailsModel, { timestamps: true });
exports.DeliveryDetailsDB = DeliveryDetailsDB;
const ReturnDB = db_1.sequelize.define("return", models_1.ReturnModel, {
    timestamps: true,
});
exports.ReturnDB = ReturnDB;
const ReturnDetailsDB = db_1.sequelize.define("return_details", models_1.ReturnDetailsModel, {
    timestamps: true,
});
exports.ReturnDetailsDB = ReturnDetailsDB;
const AdminDB = db_1.sequelize.define("admin", models_1.AdminModel, {
    timestamps: true,
});
exports.AdminDB = AdminDB;
// Relaciones //
//una categoria puede tener muchas donaciones y una donacion pertenece a una categoria
CategoryDB.hasMany(DonationDB, { foreignKey: "category_id", sourceKey: "id" });
DonationDB.belongsTo(CategoryDB, {
    foreignKey: "category_id",
    targetKey: "id",
});
//una caridad puede tener muchas donaciones y una donacion pertenece a una caridad
CharityDB.hasMany(DonationDB, { foreignKey: "charity_id", sourceKey: "id" });
DonationDB.belongsTo(CharityDB, { foreignKey: "charity_id", targetKey: "id" });
//una comunidad puede tener muchos pacientes y un paciente pertenece a una comunidad
CommunityDB.hasMany(PatientDB, { foreignKey: "community_id", sourceKey: "id" });
PatientDB.belongsTo(CommunityDB, {
    foreignKey: "community_id",
    targetKey: "id",
});
//un paciente puede tener muchas patologias y una patologia puede pertenecer a muchos pacientes
PatientDB.belongsToMany(PathologyDB, {
    through: PathologyPatientDB,
    foreignKey: "patient_id",
});
PathologyDB.belongsToMany(PatientDB, {
    through: PathologyPatientDB,
    foreignKey: "pathology_id",
});
// Un paciente puede tener muchas imágenes (historiales médicos)
PatientDB.hasMany(MedicalHistoryDB, { foreignKey: "patient_id" });
MedicalHistoryDB.belongsTo(PatientDB, { foreignKey: "patient_id" });
//un tratamiento puede tener muchos medicamentos y un medicamento puede pertenecer a muchos tratamientos
TreatmentDB.belongsToMany(MedicationDB, {
    through: MedicationTreatmentDB,
    foreignKey: "treatment_id",
});
MedicationDB.belongsToMany(TreatmentDB, {
    through: MedicationTreatmentDB,
    foreignKey: "medication_id",
});
//un tratamiento pertenece a un paciente
PatientDB.hasMany(TreatmentDB, { foreignKey: "patient_id", sourceKey: "id" });
TreatmentDB.belongsTo(PatientDB, { foreignKey: "patient_id", targetKey: "id" });
//un medicamento puede tener muchas patologias y una patologia puede tener muchos medicamentos
MedicationDB.belongsToMany(PathologyDB, {
    through: MedicationPathologyDB,
    foreignKey: "medication_id",
});
PathologyDB.belongsToMany(MedicationDB, {
    through: MedicationPathologyDB,
    foreignKey: "pathology_id",
});
//un medicamento puede tener muchas fechas de vencimiento
MedicationDB.hasMany(MedicationExpirationDateDB, {
    foreignKey: "medication_id",
    sourceKey: "id",
});
MedicationExpirationDateDB.belongsTo(MedicationDB, {
    foreignKey: "medication_id",
    targetKey: "id",
});
//un medicamento puede tener muchas eliminaciones
MedicationDB.hasMany(MedicationDisposalDB, {
    foreignKey: "medication_id",
    sourceKey: "id",
});
MedicationDisposalDB.belongsTo(MedicationDB, {
    foreignKey: "medication_id",
    targetKey: "id",
});
//un medicamento puede tener muchas donaciones y una donacion puede tener muchos medicamentos
MedicationDB.belongsToMany(DonationDB, {
    through: MedicationDonationDB,
    foreignKey: "medication_id",
});
DonationDB.belongsToMany(MedicationDB, {
    through: MedicationDonationDB,
    foreignKey: "donation_id",
});
//un paciente puede tener muchas entregas de medicamentos y una entrega de medicamentos pertenece a un paciente
PatientDB.hasMany(DeliveryDB, { foreignKey: "patient_id", sourceKey: "id" });
DeliveryDB.belongsTo(PatientDB, { foreignKey: "patient_id", targetKey: "id" });
//un tratamiento puede tener muchas entregas de medicamentos y una entrega de medicamentos pertenece a un tratamiento
TreatmentDB.hasMany(DeliveryDB, {
    foreignKey: "treatment_id",
    sourceKey: "id",
});
DeliveryDB.belongsTo(TreatmentDB, {
    foreignKey: "treatment_id",
    targetKey: "id",
});
//una medicamento puede tener muchas entregas de medicamentos y una entrega de medicamentos puede tener muchos medicamentos
MedicationDB.belongsToMany(DeliveryDB, {
    through: DeliveryDetailsDB,
    foreignKey: "medication_id",
});
DeliveryDB.belongsToMany(MedicationDB, {
    through: DeliveryDetailsDB,
    foreignKey: "delivery_id",
});
//una entrega puede tener muchas devoluciones y una devolucion pertenece a una entrega
DeliveryDB.hasMany(ReturnDB, { foreignKey: "delivery_id", sourceKey: "id" });
ReturnDB.belongsTo(DeliveryDB, { foreignKey: "delivery_id", targetKey: "id" });
//una devolucion puede tener muchos medicamentos y un medicamento puede tener muchas devoluciones
ReturnDB.belongsToMany(MedicationDB, {
    through: ReturnDetailsDB,
    foreignKey: "return_id",
});
MedicationDB.belongsToMany(ReturnDB, {
    through: ReturnDetailsDB,
    foreignKey: "medication_id",
});
