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
exports.create = exports.getById = exports.getAll = void 0;
const sequelize_conf_1 = require("../config/sequelize.conf");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Return = yield sequelize_conf_1.ReturnDB.findAll({
            attributes: { exclude: ['updatedAt', 'createdAt', 'delivery_id'] },
            include: [
                {
                    model: sequelize_conf_1.MedicationDB,
                    attributes: ['name'],
                    through: {
                        attributes: ['quantity', 'reason']
                    }
                }
            ],
        });
        return {
            message: `Successful Return connection`,
            status: 200,
            data: {
                Return: Return,
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
        const Return = yield sequelize_conf_1.ReturnDB.findOne({
            where: { id: id },
            attributes: { exclude: ['updatedAt', 'createdAt', 'delivery_id'] },
            include: [
                {
                    model: sequelize_conf_1.DeliveryDB,
                    attributes: ['withdrawal_date'],
                    include: [
                        {
                            model: sequelize_conf_1.PatientDB,
                            attributes: ['first_name', 'last_name', 'id_card'],
                        }
                    ]
                },
                {
                    model: sequelize_conf_1.MedicationDB,
                    attributes: ['name'],
                    through: {
                        attributes: ['quantity', 'reason']
                    }
                }
            ],
        });
        if (!Return) {
            return {
                message: `Return for user with id ${id} not found`,
                status: 404,
            };
        }
        return {
            message: `Successful Return connection`,
            status: 200,
            data: {
                Return: Return,
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
        const returnDelivery = yield sequelize_conf_1.DeliveryDB.findOne({
            where: { id: data.delivery_id },
        });
        if (!returnDelivery) {
            return {
                message: `Delivery with id ${data.delivery_id} does not exist`,
                status: 400,
                data: {},
            };
        }
        const { medications } = data;
        if (!(medications === null || medications === void 0 ? void 0 : medications[0])) {
            return {
                message: `No medications provided`,
                status: 400,
                data: {},
            };
        }
        const Return = yield sequelize_conf_1.ReturnDB.create(Object.assign({}, data), { transaction: t });
        const medicationArray = medications.map((medication) => {
            return {
                return_id: Return.id,
                medication_id: medication.medication_id,
                quantity: medication.quantity,
                reason: medication.reason,
            };
        });
        yield sequelize_conf_1.ReturnDetailsDB.bulkCreate(medicationArray, { transaction: t });
        const returnResponse = yield sequelize_conf_1.ReturnDB.findOne({
            where: { id: Return.id },
            attributes: { exclude: ['updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.MedicationDB,
                    attributes: ['name'],
                    through: {
                        attributes: ['quantity', 'reason']
                    }
                }
            ],
            transaction: t,
        });
        yield t.commit();
        return {
            message: `Successful Return created`,
            status: 200,
            data: {
                Return: returnResponse,
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
