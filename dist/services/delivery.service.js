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
exports.getMostDeliveredPatients = exports.deliveriesMedicationReport = exports.communitiesMostDelivered = exports.changeStatus = exports.create = exports.getById = exports.getAll = void 0;
const envs_1 = require("../config/envs");
const sequelize_conf_1 = require("../config/sequelize.conf");
const emails_service_1 = require("./emails.service");
const serviceEmails = new emails_service_1.EmailService({
    service: envs_1.envs.MAILER_SERVICE,
    email: envs_1.envs.MAILER_EMAIL,
    pass: envs_1.envs.MAIL_SECRET_KEY
});
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
        //BUSCAR EL TRATAMIENTO Y EL PACIENTE
        const deliveryPatient = yield sequelize_conf_1.PatientDB.findOne({
            where: { id: data.patient_id },
        });
        const deliveryTreatment = yield sequelize_conf_1.TreatmentDB.findOne({
            where: { id: data.treatment_id },
        });
        //SI NO EXISTEN SE RETURAN UN 400
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
        serviceEmails.sendEmail({
            to: deliveryPatient.email,
            subject: "Retiro de Medicamentos",
            htmlBody: `
       <div class="body-card" style="background-color: #fff; padding: 20px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);">
  <h2 style="background: linear-gradient(to right, #023a68, #e4e9ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold;">Santos Luzardo</h2>
  <span style="color: #333;">Notificacion</span>
  <p style="color: #333;">Cordial saludo desde Santos Luzardos Delivery System.</p>
  <br>
  <p style="color: #333;">Se le notifica que su Entrega ah sido registrada Exitosamente</p>
  <div style="background-color: #fff; padding: 10px; border-radius: 4px; margin-bottom: 10px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);">
    <h3 style="color: #2196F3;">Datos del Beneficiario</h3>
    <p><strong style="color: #2196F3;">Cedula:</strong> ${deliveryPatient.first_name} </p>
    <p><strong style="color: #2196F3;">Nombre:</strong> ${deliveryPatient.last_name}</p>
    <p><strong style="color: #2196F3;">Apellido:</strong> ${deliveryPatient.id_card} </p>
  </div>
  <div style="background-color: #fff; padding: 10px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);">
    <h3 style="color: #2196F3;">Datos de La entrega</h3>
    <p><strong style="color: #2196F3;">Fecha de cita:</strong> ${data.appointment_date}</p>
    <p><strong style="color: #2196F3;">Fecha de Vencimiento:</strong> ${data.expiration_date}</p>
  </div>
  <div style="background-color: #fff; padding: 10px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);">
    <h3 style="color: #2196F3;">Medicamentos</h3>
    ${delivery === null || delivery === void 0 ? void 0 : delivery.medications.map((medication) => {
                var _a;
                return `
      <div style="background-color: #f7f7f7; padding: 10px; border-radius: 4px; margin-bottom: 10px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);">
        <h4 style="color: #2196F3;">${medication.name}</h4>
        <p><strong style="color: #2196F3;">Cantidad:</strong> ${(_a = medication.delivery_details) === null || _a === void 0 ? void 0 : _a.quantity}</p>
      </div>
    `;
            }).join('')}
  </div>
</div>
      `,
        });
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
                if (!inventoryMedication) {
                    throw new Error(`Medication with id ${medication.id} does not exist`);
                }
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
const communitiesMostDelivered = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const communities = yield sequelize_conf_1.sequelize.query(`
      SELECT 
          c.id AS community_id,
          c.name AS community_name,
          SUM(dd.quantity) AS total_medications_delivered
      FROM 
          deliveries d
      JOIN 
          delivery_details dd ON d.id = dd.delivery_id
      JOIN 
          patients p ON d.patient_id = p.id
      JOIN 
          communities c ON p.community_id = c.id
      GROUP BY 
          c.id, c.name
      ORDER BY 
          total_medications_delivered DESC
      `);
        return {
            message: `Successful Delivery connection`,
            status: 200,
            data: {
                communities: communities[0],
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
exports.communitiesMostDelivered = communitiesMostDelivered;
const deliveriesMedicationReport = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveries = yield sequelize_conf_1.sequelize.query(`
      SELECT 
          m.id AS medication_id,
          m.name AS medication_name,
          SUM(dd.quantity) AS total_delivered
      FROM 
          delivery_details dd
      JOIN 
          medications m ON dd.medication_id = m.id
      GROUP BY 
          m.id, m.name
      ORDER BY 
          total_delivered DESC;
      
      `);
        return {
            message: `Successful Delivery connection`,
            status: 200,
            data: {
                deliveries: deliveries[0],
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
exports.deliveriesMedicationReport = deliveriesMedicationReport;
const getMostDeliveredPatients = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield sequelize_conf_1.sequelize.query(`
      SELECT 
          p.id AS patient_id,
          p.first_name AS patient_first_name,
          p.last_name AS patient_last_name,
          COUNT(d.id) AS total_deliveries
      FROM 
          patients p
      JOIN 
          deliveries d ON p.id = d.patient_id
      GROUP BY 
          p.id, p.first_name, p.last_name
      ORDER BY 
          total_deliveries DESC;
      `);
        return {
            message: `Successful Delivery connection`,
            status: 200,
            data: {
                patients: patients[0],
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
exports.getMostDeliveredPatients = getMostDeliveredPatients;
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
