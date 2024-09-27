import { envs } from "../config/envs";
import { TreatmentDB, PatientDB, sequelize, MedicationDB, DeliveryDB, DeliveryDetailsDB } from "../config/sequelize.conf";
import { DeliveryInterface, DeliveryMedication } from "../interfaces";
import { EmailService } from "./emails.service";

const serviceEmails = new EmailService({
  service: envs.MAILER_SERVICE,
  email: envs.MAILER_EMAIL,
  pass: envs.MAIL_SECRET_KEY
});

export const getAll = async (status: string) => {
  try {
    const whereClause: Record<string, string> = {};
    if (status) {
      whereClause.status = status;
    }

    const Delivery = await DeliveryDB.findAll({
      attributes: { exclude: ['updatedAt'] },
      include: [
        {
          model: MedicationDB,
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
  } catch (error) {
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const getById = async (id: number) => {
  try {
    const Delivery = await DeliveryDB.findAll({
      where: { patient_id: id },
      attributes: { exclude: ['updatedAt'] },
      include: [
        {
          model: MedicationDB,
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
  } catch (error) {
    console.log(error)
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const create = async (data: DeliveryInterface) => {
  const t = await sequelize.transaction();
  try {

    //BUSCAR EL TRATAMIENTO Y EL PACIENTE
    const deliveryPatient = await PatientDB.findOne({
      where: { id: data.patient_id },
    });
    const deliveryTreatment = await TreatmentDB.findOne({
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
    if (!medications?.[0]) {
      return {
        message: `No medications provided`,
        status: 400,
        data: {},
      };
    }
    const Delivery = await DeliveryDB.create(
      {
        ...data,
        withdrawal_date: null
      },
      { transaction: t }
    );

    const medicationArray = medications!.map((medication) => {
      return {
        delivery_id: Delivery.id,
        medication_id: medication.medication_id,
        quantity: medication.quantity,
      };
    });

    await DeliveryDetailsDB.bulkCreate(medicationArray, { transaction: t });

    const delivery = await DeliveryDB.findOne({
      where: { id: Delivery.id },
      attributes: { exclude: ['id', 'patient_id', 'updatedAt'] },
      include: [
        {
          model: MedicationDB,
          attributes: ['name', 'quantity'],
          through: {
            attributes: ['quantity'],
          },
        },
      ],
      transaction: t,
    });

    await t.commit();

    serviceEmails.sendEmail({
      to:deliveryPatient.email,
      subject:"Retiro de Medicamentos",
      htmlBody:`
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
        </div>
      `
    })



    return {
      message: `Successful Delivery created`,
      status: 200,
      data: {
        Delivery: delivery,
      },
    };
  } catch (error) {
    await t.rollback();
    console.log(error);
    return {
      message: `Contact the administrator: ${error}`,
      status: 500,
    };
  }
};

export const changeStatus = async (id: number, newStatus: "entregado" | "pendiente" | "vencido" | "eliminado") => {
  const t = await sequelize.transaction();
  try {
    let withdrawal_date = null;

    if (newStatus === 'entregado') {
      withdrawal_date = new Date();

      const delivery = await DeliveryDB.findOne({
        where: { id },
        include: [
          {
            model: MedicationDB,
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

      const medications: DeliveryMedication[] = delivery.medications.map((medication: any) => ({
        id: medication.id,
        name: medication.name,
        delivery_details: {
          quantity: medication.delivery_details.quantity,
        },
      }));

      await Promise.all(
        medications.map(async (medication) => {
          const inventoryMedication = await MedicationDB.findOne({
            where: { id: medication.id },
            transaction: t,
          });

          if (!inventoryMedication) {
            throw new Error(`Medication with id ${medication.id} does not exist`);
          }
          
          const { quantity, name } = inventoryMedication?.dataValues;

          if (quantity < medication.delivery_details.quantity) {
            throw new Error(
              `Not enough quantity for medication ${name}. Available: ${quantity}, Requested: ${medication.delivery_details.quantity}`
            );
          }

          const newQuantity = quantity - medication.delivery_details.quantity;
          await MedicationDB.update(
            { quantity: newQuantity },
            { where: { id: medication.id }, transaction: t }
          );
        })
      );
    }

    await DeliveryDB.update(
      {
        status: newStatus,
        withdrawal_date: withdrawal_date,
      },
      { where: { id }, transaction: t }
    );

    await t.commit();

    return {
      message: `Delivery with id ${id} successfully updated to ${newStatus}`,
      status: 200,
    };
  } catch (error) {
    await t.rollback();
    console.log(error);
    return {
      message: `Contact the administrator: ${error}`,
      status: 500,
    };
  }
};



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