import { TreatmentDB, PatientDB, sequelize, MedicationDB, DeliveryDB, DeliveryDetailsDB } from "../config/sequelize.conf";
import { DeliveryInterface } from "../interfaces";

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

export const getById = async (id:number) => {
  try {
    const Delivery = await  DeliveryDB.findAll({
      where:{patient_id: id},
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
  
    if(!Delivery){
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
      const deliveryPatient = await PatientDB.findOne({
        where: { id: data.patient_id },
      });
      const deliveryTreatment = await TreatmentDB.findOne({
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
      if (!medications?.[0]) {
        return {
          message: `No medications provided`,
          status: 400,
          data: {},
        };
      }

      await Promise.all(
        medications.map(async (medication) => {
          const inventoryMedication = await MedicationDB.findOne({
            where: { id: medication.medication_id },
          });
          const { quantity, name } = inventoryMedication?.dataValues;

          if (quantity < medication.quantity) {
            throw new Error(
              `Not enough quantity for medication ${name}. Available: ${quantity}, Requested: ${medication.quantity}`
            );
          }
        })
      );
  
      const Delivery = await DeliveryDB.create(
        {
          ...data,
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
  
      for (const medication of medications) {
        const currentMedication = await MedicationDB.findOne({
          where: { id: medication.medication_id },
          transaction: t,
        });
        const { quantity } = currentMedication?.dataValues;

        const newQuantity = quantity - medication.quantity;
        if (newQuantity < 0) {
          throw new Error(
            `Insufficient stock for medication with ID ${medication.medication_id}`
          );
        }
      
        await MedicationDB.update(
          { quantity: newQuantity },
          {
            where: { id: medication.medication_id },
            transaction: t,
          }
        );
      }
      
  
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

export const changeStatus = async (id: number, newStatus: "entregado" | "pendiente" | "vencido" | "eliminado") => {
  try {
    const Delivery = await DeliveryDB.update(
      { status: newStatus },
      { where: { id } }
    );

    return {
      message: `Patient with id ${id} Successfully updated to ${newStatus}`,
      status: 200,
    };
  } catch (error) {
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
}
