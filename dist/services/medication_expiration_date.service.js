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
exports.update = exports.create = exports.getById = exports.getAll = void 0;
const sequelize_conf_1 = require("../config/sequelize.conf");
const db_1 = require("../config/db");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Medication = yield sequelize_conf_1.MedicationExpirationDateDB.findAll({
            include: [
                {
                    model: sequelize_conf_1.MedicationDB,
                    as: 'medication',
                    attributes: ['name']
                }
            ],
        });
        return {
            message: `Successful MedicationExpiration connection`,
            status: 200,
            data: {
                MedicationExpirationDate: Medication,
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
exports.getAll = getAll;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MedicationExpirationDate = yield sequelize_conf_1.MedicationExpirationDateDB.findOne({
            where: { id },
            include: [
                {
                    model: sequelize_conf_1.MedicationDB,
                    as: 'medication',
                    attributes: ['name']
                }
            ],
        });
        if (!MedicationExpirationDate) {
            return {
                message: `Medication with id ${id} not found`,
                status: 404,
            };
        }
        return {
            message: `Successful Medication connection`,
            status: 200,
            data: {
                MedicationExpirationDate: MedicationExpirationDate,
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
    try {
        const t = yield db_1.sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            const medication = yield sequelize_conf_1.MedicationDB.findOne({
                where: { id: data.medication_id }
            });
            const { quantity: medicationRemining } = medication === null || medication === void 0 ? void 0 : medication.dataValues;
            if (data.quantity >= medicationRemining) {
                return {
                    message: "Error: no puedes eliminar mas medicamentos que los que tienes en stock",
                    status: 400,
                };
            }
            // Sumar las cantidades ya registradas en la tabla fecha_vencimiento_medicamentos
            const cantidadRegistrada = yield sequelize_conf_1.MedicationExpirationDateDB.sum('quantity', {
                where: { medication_id: data.medication_id }
            });
            const cantidadTotal = cantidadRegistrada + data.quantity;
            // Verificar si la nueva cantidad excede la cantidad disponible en medicamentos
            if (cantidadTotal > medicationRemining) {
                return {
                    message: `Error: no puedes registrar mas medicamentos que los que tienes en stock`,
                    status: 400,
                    data: {}
                };
            }
            const MedicationExpirationDate = yield sequelize_conf_1.MedicationExpirationDateDB.create(Object.assign({}, data), { transaction: t });
            const MedicationExpirationDateCreated = yield sequelize_conf_1.MedicationExpirationDateDB.findOne({
                where: { id: MedicationExpirationDate.id },
                include: [
                    {
                        model: sequelize_conf_1.MedicationDB,
                        as: 'medication',
                        attributes: ['name']
                    }
                ],
                transaction: t
            });
            return {
                message: `Successful Medication created`,
                status: 200,
                data: {
                    MedicationExpiration: MedicationExpirationDateCreated,
                },
            };
        }));
        if (!t) {
            return {
                message: `something went wrong`,
                status: 500,
                data: {}
            };
        }
        return t;
    }
    catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.create = create;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Medication = yield sequelize_conf_1.MedicationDB.findOne({
            where: { id }
        });
        if (!Medication) {
            return {
                message: `Medication with id ${id} not found`,
                status: 404,
            };
        }
        const MedicationUpdted = yield sequelize_conf_1.MedicationDB.update(Object.assign({}, data), {
            where: { id }
        });
        const MedicationUpdated = yield sequelize_conf_1.MedicationDB.findOne({ where: { id } });
        return {
            message: `Successful Community updted`,
            status: 200,
            data: {
                Community: MedicationUpdated,
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
