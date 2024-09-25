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
exports.deletePatient = exports.update = exports.create = exports.getAllActive = exports.getById = exports.getAll = void 0;
const sequelize_conf_1 = require("../config/sequelize.conf");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Patient = yield sequelize_conf_1.PatientDB.findAll({
            attributes: { exclude: ['id', 'community_id', 'updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.CommunityDB,
                    as: 'community',
                    attributes: ['name']
                },
                {
                    model: sequelize_conf_1.PathologyDB,
                    as: 'pathologies',
                    attributes: ['name'],
                    through: {
                        attributes: ['description']
                    }
                }
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
            attributes: { exclude: ['id', 'community_id', 'updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.CommunityDB,
                    as: 'community',
                    attributes: ['name']
                },
                {
                    model: sequelize_conf_1.PathologyDB,
                    as: 'pathologies',
                    attributes: ['name'],
                    through: {
                        attributes: ['description']
                    }
                }
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
const getAllActive = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Patient = yield sequelize_conf_1.PatientDB.findAll({
            where: { status: "active" },
            attributes: { exclude: ['id', 'community_id', 'updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.CommunityDB,
                    as: 'community',
                    attributes: ['name']
                },
                {
                    model: sequelize_conf_1.PathologyDB,
                    as: 'pathologies',
                    attributes: ['name'],
                    through: {
                        attributes: ['description']
                    }
                }
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
        const patientCedula = yield sequelize_conf_1.PatientDB.findOne({
            where: { id_card: data.id_card }
        });
        if (patientCedula) {
            return {
                message: `patient with cedula ${data.id_card} already exists`,
                status: 400,
                data: {}
            };
        }
        const { pathologies } = data;
        const Patient = yield sequelize_conf_1.PatientDB.create(Object.assign({}, data), { transaction: t });
        const pathologiesArray = pathologies.map((pathology) => {
            return {
                patient_id: Patient.id,
                pathology_id: pathology.id_pathology,
                description: pathology.description,
            };
        });
        yield sequelize_conf_1.PathologyPatientDB.bulkCreate(pathologiesArray, { transaction: t });
        const patient = yield sequelize_conf_1.PatientDB.findOne({
            where: { id: Patient.id },
            attributes: { exclude: ['id', 'community_id', 'updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.CommunityDB,
                    as: 'community',
                    attributes: ['name']
                },
                {
                    model: sequelize_conf_1.PathologyDB,
                    as: 'pathologies',
                    attributes: ['name'],
                    through: {
                        attributes: ['description']
                    }
                }
            ],
            transaction: t
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
            where: { id }
        });
        if (!patientCedula) {
            return {
                message: `patient with id:${data.id_card} doenst exists`,
                status: 400,
                data: {}
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
            transaction: t
        });
        yield sequelize_conf_1.PathologyPatientDB.bulkCreate(pathologiesArray, { transaction: t });
        const patient = yield sequelize_conf_1.PatientDB.findOne({
            where: { id },
            attributes: { exclude: ['id', 'community_id', 'updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.CommunityDB,
                    as: 'community',
                    attributes: ['name']
                },
                {
                    model: sequelize_conf_1.PathologyDB,
                    as: 'pathologies',
                    attributes: ['name'],
                    through: {
                        attributes: ['description']
                    }
                }
            ],
            transaction: t
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
