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
exports.deleteTreatment = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const sequelize_conf_1 = require("../config/sequelize.conf");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Treatment = yield sequelize_conf_1.TreatmentDB.findAll({
            where: { active: 'active' },
            attributes: { exclude: ['updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.MedicationDB,
                    attributes: ['name', 'quantity'],
                    through: {
                        attributes: ['quantity']
                    }
                }
            ],
        });
        return {
            message: `Successful Patient connection`,
            status: 200,
            data: {
                Treatment: Treatment,
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
        const Treatment = yield sequelize_conf_1.TreatmentDB.findOne({
            where: { patient_id: id, active: 'active' },
            attributes: { exclude: ['updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.MedicationDB,
                    attributes: ['name', 'quantity'],
                    through: {
                        attributes: ['quantity']
                    }
                }
            ],
        });
        if (!Treatment) {
            return {
                message: `Treatment with id ${id} not found`,
                status: 404,
            };
        }
        return {
            message: `Successful Treatment connection`,
            status: 200,
            data: {
                Treatment: Treatment,
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
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield sequelize_conf_1.sequelize.transaction();
    try {
        const patient = yield sequelize_conf_1.PatientDB.findOne({
            where: { id: data.patient_id }
        });
        if (!patient) {
            return {
                message: `Patient with id ${data.patient_id} does not exist`,
                status: 400,
                data: {}
            };
        }
        const { medications } = data;
        const Treatment = yield sequelize_conf_1.TreatmentDB.create(Object.assign({}, data), { transaction: t });
        const medicationArray = medications.map((medication) => {
            return {
                treatment_id: Treatment.id,
                medication_id: medication.medication_id,
                quantity: medication.quantity,
            };
        });
        yield sequelize_conf_1.MedicationTreatmentDB.bulkCreate(medicationArray, { transaction: t });
        const treatement = yield sequelize_conf_1.TreatmentDB.findOne({
            where: { id: Treatment.id },
            attributes: { exclude: ['id', 'patient_id', 'updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.MedicationDB,
                    attributes: ['name', 'quantity'],
                    through: {
                        attributes: ['quantity']
                    }
                }
            ],
            transaction: t
        });
        yield t.commit();
        return {
            message: `Successful Treatment created`,
            status: 200,
            data: {
                Treatment: treatement,
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
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield sequelize_conf_1.sequelize.transaction();
    try {
        const treament = yield sequelize_conf_1.TreatmentDB.findOne({
            where: { id }
        });
        if (!treament) {
            return {
                message: `Treament with id ${id} does not exist`,
                status: 400,
                data: {}
            };
        }
        const { medications } = data;
        yield sequelize_conf_1.TreatmentDB.update(Object.assign({}, data), { where: { id }, transaction: t });
        const medicationArray = medications.map((medication) => {
            return {
                treatment_id: id,
                medication_id: medication.medication_id,
                quantity: medication.quantity,
            };
        });
        yield sequelize_conf_1.MedicationTreatmentDB.destroy({
            where: { treatment_id: id },
            transaction: t
        });
        yield sequelize_conf_1.MedicationTreatmentDB.bulkCreate(medicationArray, { transaction: t });
        const treatement = yield sequelize_conf_1.TreatmentDB.findOne({
            where: { id },
            attributes: { exclude: ['updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.MedicationDB,
                    attributes: ['name', 'quantity'],
                    through: {
                        attributes: ['quantity']
                    }
                }
            ],
            transaction: t
        });
        yield t.commit();
        return {
            message: `Successful Treatment created`,
            status: 200,
            data: {
                Treatment: treatement,
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
const deleteTreatment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Treatment = yield sequelize_conf_1.TreatmentDB.update({ active: "deleted" }, { where: { patient_id: id } });
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
exports.deleteTreatment = deleteTreatment;
