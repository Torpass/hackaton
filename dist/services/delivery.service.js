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
exports.changeStatus = exports.create = exports.getById = exports.getAll = void 0;
const sequelize_conf_1 = require("../config/sequelize.conf");
const getAll = (status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whereClause = {};
        if (status) {
            whereClause.status = status;
        }
        const Delivery = yield sequelize_conf_1.DeliveryDB.findAll({
            attributes: { exclude: ['updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.MedicationDB,
                    attributes: ['name'],
                    through: {
                        attributes: ['quantity']
                    }
                }
            ],
            where: whereClause
        });
        return {
            message: `Successful Delivery connection`,
            status: 200,
            data: {
                Delivery: Delivery,
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
        const Delivery = yield sequelize_conf_1.DeliveryDB.findAll({
            where: { patient_id: id },
            attributes: { exclude: ['updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.MedicationDB,
                    attributes: ['name'],
                    through: {
                        attributes: ['quantity']
                    }
                }
            ],
        });
        if (!Delivery) {
            return {
                message: `Delivery for user with id ${id} not found`,
                status: 404,
            };
        }
        return {
            message: `Successful Delivery connection`,
            status: 200,
            data: {
                Delivery: Delivery,
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
        const deliveryPatient = yield sequelize_conf_1.PatientDB.findOne({
            where: { id: data.patient_id },
        });
        const deliveryTreatment = yield sequelize_conf_1.TreatmentDB.findOne({
            where: { id: data.treatment_id },
        });
        if (!deliveryPatient || !deliveryTreatment) {
            return {
                message: `Patient with id ${data.patient_id} or Treatment with id ${data.treatment_id} does not exist`,
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
        const Delivery = yield sequelize_conf_1.DeliveryDB.create(Object.assign(Object.assign({}, data), { withdrawal_date: null }), { transaction: t });
        const medicationArray = medications.map((medication) => {
            return {
                delivery_id: Delivery.id,
                medication_id: medication.medication_id,
                quantity: medication.quantity,
            };
        });
        yield sequelize_conf_1.DeliveryDetailsDB.bulkCreate(medicationArray, { transaction: t });
        const delivery = yield sequelize_conf_1.DeliveryDB.findOne({
            where: { id: Delivery.id },
            attributes: { exclude: ['id', 'patient_id', 'updatedAt'] },
            include: [
                {
                    model: sequelize_conf_1.MedicationDB,
                    attributes: ['name', 'quantity'],
                    through: {
                        attributes: ['quantity'],
                    },
                },
            ],
            transaction: t,
        });
        yield t.commit();
        return {
            message: `Successful Delivery created`,
            status: 200,
            data: {
                Delivery: delivery,
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
const changeStatus = (id, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield sequelize_conf_1.sequelize.transaction();
    try {
        let withdrawal_date = null;
        if (newStatus === 'entregado') {
            withdrawal_date = new Date();
            const delivery = yield sequelize_conf_1.DeliveryDB.findOne({
                where: { id },
                include: [
                    {
                        model: sequelize_conf_1.MedicationDB,
                        through: {
                            attributes: ['quantity'],
                        },
                    },
                ],
                transaction: t,
            });
            if (!delivery) {
                throw new Error(`Delivery with id ${id} does not exist`);
            }
            if (!delivery.medications || !delivery.medications.length) {
                return {
                    message: "No medications provided",
                    status: 400,
                    data: {},
                };
            }
            const medications = delivery.medications.map((medication) => ({
                id: medication.id,
                name: medication.name,
                delivery_details: {
                    quantity: medication.delivery_details.quantity,
                },
            }));
            yield Promise.all(medications.map((medication) => __awaiter(void 0, void 0, void 0, function* () {
                const inventoryMedication = yield sequelize_conf_1.MedicationDB.findOne({
                    where: { id: medication.id },
                    transaction: t,
                });
                const { quantity, name } = inventoryMedication === null || inventoryMedication === void 0 ? void 0 : inventoryMedication.dataValues;
                if (quantity < medication.delivery_details.quantity) {
                    throw new Error(`Not enough quantity for medication ${name}. Available: ${quantity}, Requested: ${medication.delivery_details.quantity}`);
                }
                const newQuantity = quantity - medication.delivery_details.quantity;
                yield sequelize_conf_1.MedicationDB.update({ quantity: newQuantity }, { where: { id: medication.id }, transaction: t });
            })));
        }
        yield sequelize_conf_1.DeliveryDB.update({
            status: newStatus,
            withdrawal_date: withdrawal_date,
        }, { where: { id }, transaction: t });
        yield t.commit();
        return {
            message: `Delivery with id ${id} successfully updated to ${newStatus}`,
            status: 200,
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
exports.changeStatus = changeStatus;
/* export const update = async (id:number, data:DeliveryInterface) => {

  const t = await sequelize.transaction();
  try {
    const delivery = await DeliveryDB.findOne({
      where: {id}
    });

    if (!delivery) {
      return {
        message: `Delivery with id ${id} does not exist`,
        status: 400,
        data: {}
      };
    }

    const {medications} = data;

    await DeliveryDB.update({
      ...data
    }, {where: {id}, transaction: t});

    const medicationArray = medications!.map((medication) => {
        return {
            delivery_id: delivery.id,
            medication_id: medication.medication_id,
            quantity: medication.quantity,
        }
    });

    await DeliveryDetailsDB.destroy({
      where: {delivery_id: id},
      transaction:t
    });

    await DeliveryDetailsDB.bulkCreate(medicationArray, {transaction: t});

    const deliveryResponse = await DeliveryDB.findOne({
        where: { id: delivery.id },
        attributes: { exclude: ['id', 'patient_id', 'updatedAt'] },
        include: [
            {
            model: MedicationDB,
            attributes: ['name', 'quantity'],
            through: {
                attributes: ['quantity']
            }
            }
        ],
        transaction: t
    });

    await t.commit();

    return {
      message: `Successful Delivery created`,
      status: 200,
      data: {
        Delivery: deliveryResponse,
      },
    };

  } catch (error) {
    console.log(error);
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
}
 */ 
