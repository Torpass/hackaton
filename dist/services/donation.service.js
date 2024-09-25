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
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Donation = yield sequelize_conf_1.DonationDB.findAll({
            attributes: { exclude: ['category_id', 'charity_id', 'updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.CategoryDB,
                    attributes: ['name', 'description']
                },
                {
                    model: sequelize_conf_1.CharityDB,
                    attributes: ['razon_social']
                },
                {
                    model: sequelize_conf_1.MedicationDB,
                    attributes: ['name'],
                    through: {
                        as: 'medication_details',
                        attributes: ['quantity', 'expiration_date'],
                    }
                }
            ]
        });
        return {
            message: `Successful Donation connection`,
            status: 200,
            data: {
                Donation: Donation,
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
        const Donation = yield sequelize_conf_1.DonationDB.findOne({
            where: { id },
            attributes: { exclude: ['category_id', 'charity_id', 'updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.CategoryDB,
                    attributes: ['name', 'description']
                },
                {
                    model: sequelize_conf_1.CharityDB,
                    attributes: ['razon_social']
                },
                {
                    model: sequelize_conf_1.MedicationDB,
                    attributes: ['name'],
                    through: {
                        as: 'medication_details',
                        attributes: ['quantity', 'expiration_date'],
                    }
                }
            ]
        });
        if (!Donation) {
            return {
                message: `Donation with id ${id} not found`,
                status: 404,
            };
        }
        return {
            message: `Successful Donation connection`,
            status: 200,
            data: {
                Donation: Donation,
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
        const { medications } = data;
        const Donation = yield sequelize_conf_1.DonationDB.create(Object.assign({}, data), { transaction: t });
        const medicationArray = medications.map((medication) => {
            return {
                donation_id: Donation.id,
                medication_id: medication.medication_id,
                quantity: medication.quantity,
                expiration_date: medication.expiration_date
            };
        });
        yield sequelize_conf_1.MedicationDonationDB.bulkCreate(medicationArray, { transaction: t });
        for (const medication of medications) {
            yield sequelize_conf_1.MedicationDB.increment('quantity', {
                by: medication.quantity,
                where: { id: medication.medication_id },
                transaction: t
            });
        }
        yield t.commit();
        const DonationCreated = yield sequelize_conf_1.DonationDB.findOne({
            where: { id: Donation.id },
            attributes: { exclude: ['category_id', 'charity_id', 'updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.CategoryDB,
                    attributes: ['name', 'description']
                },
                {
                    model: sequelize_conf_1.CharityDB,
                    attributes: ['razon_social']
                },
                {
                    model: sequelize_conf_1.MedicationDB,
                    attributes: ['name'],
                    through: {
                        as: 'medication_details',
                        attributes: ['quantity', 'expiration_date'],
                    }
                }
            ]
        });
        return {
            message: `Successful Donation created`,
            status: 200,
            data: {
                Donation: DonationCreated,
            },
        };
    }
    catch (error) {
        console.log(error);
        yield t.rollback();
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.create = create;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield sequelize_conf_1.sequelize.transaction();
    try {
        const { medications } = data;
        // Buscar la donación existente
        const donation = yield sequelize_conf_1.DonationDB.findByPk(id, {
            include: [{
                    model: sequelize_conf_1.MedicationDB,
                    as: 'medications',
                    through: { attributes: ['quantity',] }
                }],
            transaction: t
        });
        if (!donation) {
            return {
                message: `Donation not found`,
                status: 404,
            };
        }
        const oldMedicationQuantity = yield sequelize_conf_1.MedicationDonationDB.findAll({
            where: { donation_id: id },
            attributes: ['quantity', 'medication_id'],
            transaction: t,
        });
        // Actualizar los detalles de la donación
        yield donation.update(Object.assign({}, data), { transaction: t });
        // Eliminar los registros de medicamentos asociados existentes
        yield sequelize_conf_1.MedicationDonationDB.destroy({
            where: { donation_id: id },
            transaction: t,
        });
        // Decrementar la cantidad de medicamentos en el inventario en base a la cantidad anterior
        for (const oldMedication of oldMedicationQuantity) {
            yield sequelize_conf_1.MedicationDB.decrement('quantity', {
                by: oldMedication.quantity,
                where: { id: oldMedication.medication_id },
                transaction: t,
            });
        }
        // Crear nuevos registros de medicamentos asociados
        const medicationArray = medications.map((medication) => {
            return {
                donation_id: id,
                medication_id: medication.medication_id,
                quantity: medication.quantity,
                expiration_date: medication.expiration_date,
            };
        });
        yield sequelize_conf_1.MedicationDonationDB.bulkCreate(medicationArray, { transaction: t });
        // Actualizar la cantidad de medicamentos en el inventario
        for (const medication of medications) {
            yield sequelize_conf_1.MedicationDB.increment('quantity', {
                by: medication.quantity,
                where: { id: medication.medication_id },
                transaction: t,
            });
        }
        console.log("before commit");
        yield t.commit();
        const DonationUpdated = yield sequelize_conf_1.DonationDB.findOne({
            where: { id: donation.id },
            attributes: { exclude: ['category_id', 'charity_id', 'updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.CategoryDB,
                    attributes: ['name', 'description'],
                },
                {
                    model: sequelize_conf_1.CharityDB,
                    attributes: ['name'],
                },
                {
                    model: sequelize_conf_1.MedicationDB,
                    attributes: ['name'],
                    through: {
                        as: 'medication_details',
                        attributes: ['quantity', 'expiration_date'],
                    },
                },
            ],
        });
        return {
            message: `Successful Donation updated`,
            status: 200,
            data: {
                Donation: DonationUpdated,
            },
        };
    }
    catch (error) {
        yield t.rollback();
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.update = update;
