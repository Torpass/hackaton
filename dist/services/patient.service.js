"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatient = exports.getPatientsByCommunity = exports.getRangePatients = exports.getPriorityPatients = exports.update = exports.create = exports.getAllActive = exports.getFullPatient = exports.getById = exports.getAll = void 0;
const sequelize_conf_1 = require("../config/sequelize.conf");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Patient = yield sequelize_conf_1.PatientDB.findAll({
            attributes: { exclude: ["community_id", "updatedAt"] },
            include: [
                {
                    model: sequelize_conf_1.CommunityDB,
                    as: "community",
                    attributes: ["name"],
                },
                {
                    model: sequelize_conf_1.PathologyDB,
                    as: "pathologies",
                    attributes: ["name"],
                    through: {
                        attributes: ["description"],
                    },
                },
            ],
        });
        return {
            message: `Successful Patient connection`,
            status: 200,
            data: {
                Patients: Patient,
            },
        };
    }
    catch (error) {
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.getAll = getAll;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Patient = yield sequelize_conf_1.PatientDB.findOne({
            where: { id_card: id },
            attributes: { exclude: ["id", "community_id", "updatedAt"] },
            include: [
                {
                    model: sequelize_conf_1.CommunityDB,
                    as: "community",
                    attributes: ["name"],
                },
                {
                    model: sequelize_conf_1.PathologyDB,
                    as: "pathologies",
                    attributes: ["name"],
                    through: {
                        attributes: ["description"],
                    },
                },
            ],
        });
        if (!Patient) {
            return {
                message: `Patient with id ${id} not found`,
                status: 404,
            };
        }
        return {
            message: `Successful Patient connection`,
            status: 200,
            data: {
                Patient: Patient,
            },
        };
    }
    catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.getById = getById;
const getFullPatient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Patient = yield sequelize_conf_1.PatientDB.findOne({
            where: { id_card: id },
        });
        if (!Patient) {
            return {
                message: `Patient with id ${id} not found`,
                status: 404,
            };
        }
        const patientFicha = yield sequelize_conf_1.PatientDB.findOne({
            where: { id: Patient.id },
            attributes: { exclude: ["community_id", "updatedAt"] },
            include: [
                //patologías del paciente
                {
                    model: sequelize_conf_1.PathologyDB,
                    through: { attributes: [] },
                    attributes: ["name"],
                },
                //tratamientos del paciente
                {
                    model: sequelize_conf_1.TreatmentDB,
                    attributes: { exclude: ["patient_id", "updatedAt"] },
                    include: [
                        {
                            model: sequelize_conf_1.MedicationDB,
                            attributes: {
                                exclude: ["quantity", "createdAt", "updatedAt"],
                            },
                            through: {
                                attributes: ["quantity"],
                                as: "medication_quantity",
                            },
                        },
                    ],
                },
                //medicamentos del paciente
                {
                    model: sequelize_conf_1.DeliveryDB,
                    include: [
                        {
                            model: sequelize_conf_1.MedicationDB,
                            through: { attributes: ["quantity"] },
                            attributes: ["name"],
                        },
                        {
                            model: sequelize_conf_1.ReturnDB,
                            include: [
                                {
                                    model: sequelize_conf_1.MedicationDB,
                                    attributes: {
                                        exclude: ["quantity", "createdAt", "updatedAt"],
                                    },
                                    through: { attributes: ["quantity"] },
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        return {
            message: `Successful Patient connection`,
            status: 200,
            data: {
                Patient: patientFicha,
            },
        };
    }
    catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.getFullPatient = getFullPatient;
const getAllActive = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Patient = yield sequelize_conf_1.PatientDB.findAll({
            where: { status: "active" },
            attributes: { exclude: ["community_id", "updatedAt"] },
            include: [
                {
                    model: sequelize_conf_1.CommunityDB,
                    as: "community",
                    attributes: ["name"],
                },
                {
                    model: sequelize_conf_1.PathologyDB,
                    as: "pathologies",
                    attributes: ["name"],
                    through: {
                        attributes: ["description"],
                    },
                },
            ],
        });
        return {
            message: `Successful Patient connection`,
            status: 200,
            data: {
                Patient: Patient,
            },
        };
    }
    catch (error) {
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.getAllActive = getAllActive;
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield sequelize_conf_1.sequelize.transaction();
    try {
        const lastPatient = yield sequelize_conf_1.PatientDB.findOne({
            order: [["id", "DESC"]],
            transaction: t,
        });
        const newPatientId = lastPatient ? lastPatient.id + 1 : 1;
        const patientCedula = yield sequelize_conf_1.PatientDB.findOne({
            where: { id_card: data.id_card },
        });
        if (patientCedula) {
            return {
                message: `patient with cedula ${data.id_card} already exists`,
                status: 400,
                data: {},
            };
        }
        const { pathologies, images } = data;
        console.log(pathologies);
        console.log(images);
        const Patient = yield sequelize_conf_1.PatientDB.create(Object.assign({ id: newPatientId }, data), { transaction: t });
        if (!pathologies) {
            throw new Error("Pathologies is required");
        }
        const lastRecord = yield sequelize_conf_1.PathologyPatientDB.findOne({
            order: [["id", "DESC"]],
            attributes: ["id"],
        });
        let pathologyPatientId = lastRecord ? lastRecord.get("id") : 0;
        const newPathologies = pathologies.map((pathology) => {
            pathologyPatientId++;
            return {
                id: pathologyPatientId,
                patient_id: Patient.id,
                pathology_id: pathology.id_pathology,
                description: pathology.description,
            };
        });
        yield sequelize_conf_1.PathologyPatientDB.bulkCreate(newPathologies, { transaction: t });
        // const imagesArray = images!.map((image) => {
        //   return {
        //     patient_id: Patient.id,
        //     url: image,
        //   }
        // });
        // await MedicalHistoryDB.bulkCreate(imagesArray, { transaction: t });
        const patient = yield sequelize_conf_1.PatientDB.findOne({
            where: { id: Patient.id },
            attributes: { exclude: ["id", "community_id", "updatedAt"] },
            include: [
                {
                    model: sequelize_conf_1.CommunityDB,
                    as: "community",
                    attributes: ["name"],
                },
                {
                    model: sequelize_conf_1.PathologyDB,
                    as: "pathologies",
                    attributes: ["name"],
                    through: {
                        attributes: ["description"],
                    },
                },
                {
                    model: sequelize_conf_1.MedicalHistoryDB,
                    attributes: ["url"],
                },
            ],
            transaction: t,
        });
        yield t.commit();
        return {
            message: `Successful Patient created`,
            status: 200,
            data: {
                Patient: patient,
            },
        };
    }
    catch (error) {
        yield t.rollback();
        console.log(error);
        return {
            message: `Contact the administrator: ${error}`,
            status: 500,
        };
    }
});
exports.create = create;
//TODO update patient
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield sequelize_conf_1.sequelize.transaction();
    try {
        const patientCedula = yield sequelize_conf_1.PatientDB.findOne({
            where: { id },
        });
        if (!patientCedula) {
            return {
                message: `patient with id:${data.id_card} doenst exists`,
                status: 400,
                data: {},
            };
        }
        const { pathologies } = data;
        yield sequelize_conf_1.PatientDB.update(Object.assign({}, data), { where: { id }, transaction: t });
        const pathologiesArray = pathologies.map((pathology) => {
            return {
                patient_id: id,
                pathology_id: pathology.id_pathology,
                description: pathology.description,
            };
        });
        //delete all pathologies of the patient
        yield sequelize_conf_1.PathologyPatientDB.destroy({
            where: { patient_id: id },
            transaction: t,
        });
        yield sequelize_conf_1.PathologyPatientDB.bulkCreate(pathologiesArray, { transaction: t });
        const patient = yield sequelize_conf_1.PatientDB.findOne({
            where: { id },
            attributes: { exclude: ["id", "community_id", "updatedAt"] },
            include: [
                {
                    model: sequelize_conf_1.CommunityDB,
                    as: "community",
                    attributes: ["name"],
                },
                {
                    model: sequelize_conf_1.PathologyDB,
                    as: "pathologies",
                    attributes: ["name"],
                    through: {
                        attributes: ["description"],
                    },
                },
            ],
            transaction: t,
        });
        yield t.commit();
        return {
            message: `Successful Patient created`,
            status: 200,
            data: {
                Patient: patient,
            },
        };
    }
    catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.update = update;
const getPriorityPatients = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vulnerablePatients = yield sequelize_conf_1.PatientDB.findAll({
            where: {
                status: "active", // Solo pacientes activos
            },
            attributes: [
                "first_name",
                "last_name",
                "id_card",
                "economic_status",
                "vulnerability_level",
                "phone",
                "address",
            ],
            order: [
                sequelize_conf_1.sequelize.literal(`
          CASE 
            WHEN vulnerability_level = 'muy critico' THEN 1
            WHEN vulnerability_level = 'critico' THEN 2
            WHEN vulnerability_level = 'medio' THEN 3
            WHEN vulnerability_level = 'bajo' THEN 4
            WHEN vulnerability_level = 'no especificado' THEN 5
            ELSE 6
          END
        `),
                sequelize_conf_1.sequelize.literal(`
          CASE 
            WHEN economic_status = 'clase baja' THEN 1
            WHEN economic_status = 'clase media baja' THEN 2
            WHEN economic_status = 'clase media' THEN 3
            WHEN economic_status = 'clase media alta' THEN 4
            WHEN economic_status = 'clase alta' THEN 5
            ELSE 6
          END
        `),
            ],
        });
        return {
            message: `Successful Patient connection`,
            status: 200,
            data: {
                vulnerablePatients: vulnerablePatients,
            },
        };
    }
    catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.getPriorityPatients = getPriorityPatients;
const getRangePatients = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { vulnerabilityLevel, economicStatus } = data;
        const filteredPatients = yield sequelize_conf_1.PatientDB.findAll({
            where: Object.assign({ status: "active" }, data),
            attributes: [
                "first_name",
                "last_name",
                "id_card",
                "economic_status",
                "vulnerability_level",
                "phone",
                "address",
            ],
        });
        return {
            message: `Successful Patient connection`,
            status: 200,
            data: {
                Patients: filteredPatients,
            },
        };
    }
    catch (error) {
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.getRangePatients = getRangePatients;
const getPatientsByCommunity = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Patients = yield sequelize_conf_1.sequelize.query(`
      SELECT 
        c.id AS community_id,
        c.name AS community_name,
        COUNT(p.id) AS patient_count  -- Contamos el número de pacientes por comunidad
      FROM 
        communities AS c
      LEFT JOIN 
        patients AS p ON c.id = p.community_id  -- Unimos las comunidades con los pacientes
      GROUP BY 
        c.id, c.name  -- Agrupamos por ID y nombre de la comunidad
      ORDER BY 
        patient_count DESC  -- Ordenamos de mayor a menor cantidad de pacientes
      `);
        return {
            message: `Successful Patient connection`,
            status: 200,
            data: {
                Patients: Patients[0],
            },
        };
    }
    catch (error) {
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.getPatientsByCommunity = getPatientsByCommunity;
const deletePatient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Patient = yield sequelize_conf_1.PatientDB.update({ status: "deleted" }, { where: { id } });
        return {
            message: `Patient with id ${id} Successfully deleted`,
            status: 200,
        };
    }
    catch (error) {
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.deletePatient = deletePatient;
