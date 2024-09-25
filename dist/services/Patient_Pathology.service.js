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
exports.Delete = exports.CreatePathologyPatient = exports.getPAtienPathologyByID = exports.getAllPAtienPathology = void 0;
const sequelize_conf_1 = require("../config/sequelize.conf");
const getAllPAtienPathology = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Pathologies = yield sequelize_conf_1.PatientDB.findAll({
            include: [
                {
                    model: sequelize_conf_1.PathologyDB,
                    attributes: ['name']
                }
            ]
        });
        return {
            message: `Successful Patient Pathology connection`,
            status: 200,
            data: {
                Pathologies: Pathologies,
            },
        };
    }
    catch (error) {
        return {
            message: `Contact the administrator: ${error}`,
            status: 500,
        };
    }
});
exports.getAllPAtienPathology = getAllPAtienPathology;
const getPAtienPathologyByID = (IdPatient) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Patient = yield sequelize_conf_1.PatientDB.findOne({
            where: { id: IdPatient },
            include: [
                {
                    model: sequelize_conf_1.PathologyDB,
                    attributes: ['name']
                }
            ]
        });
        return {
            message: `Successful Patient Pathology connection`,
            status: 200,
            data: {
                Patient: Patient,
            },
        };
    }
    catch (error) {
        return {
            message: `Contact the administrator: ${error} ${IdPatient}`,
            status: 500,
        };
    }
});
exports.getPAtienPathologyByID = getPAtienPathologyByID;
const CreatePathologyPatient = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Patient_Pathology = yield sequelize_conf_1.PathologyPatientDB.create(Object.assign({}, data));
        return {
            message: `Successful Patient Pathology created`,
            status: 200,
            data: {
                Patient_Pathology: Patient_Pathology,
            },
        };
    }
    catch (error) {
        return {
            message: `Contact the administrator: ${error}`,
            status: 500,
        };
    }
});
exports.CreatePathologyPatient = CreatePathologyPatient;
const Delete = (id_patien, id_Pathology) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Existpatient = yield sequelize_conf_1.PathologyPatientDB.findOne({ where: {
                patient_id: id_patien,
                pathology_id: id_Pathology
            } });
        if (!Existpatient) {
            return {
                message: `Patient_Pathology with id ${id_Pathology} not found`,
                status: 404,
            };
        }
        const RowsAffecteds = yield sequelize_conf_1.PathologyPatientDB.destroy({
            where: { patient_id: id_patien,
                pathology_id: id_Pathology
            }
        });
        return {
            message: `Successful Patient_Pathology Deleted`,
            status: 200,
            data: {
                "RowsAffecteds": RowsAffecteds,
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
exports.Delete = Delete;
