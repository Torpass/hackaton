import { PatientDB, sequelize, MedicationDB, DeliveryDB, ReturnDB, ReturnDetailsDB } from "../config/sequelize.conf";
import { ReturnInterface } from "../interfaces";

export const getAll = async () => {
    try {
      const Return = await  ReturnDB.findAll({
        attributes: { exclude: ['updatedAt', 'createdAt', 'delivery_id'] },
        include: [
          {
            model: MedicationDB,
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
    } catch (error) {
      return {
        message: `Contact the administrator: error`,
        status: 500,
      };
    }
  };

export const getById = async (id:number) => {
  try {
    const Return = await  ReturnDB.findOne({
      where:{id: id},
      attributes: { exclude: ['updatedAt', 'createdAt', 'delivery_id'] },
      include: [
        {
            model: DeliveryDB,
            attributes: ['withdrawal_date'],
            include:[
                {
                    model: PatientDB,
                    attributes: ['first_name', 'last_name', 'id_card'],
                }
            ]
        },
        {
          model: MedicationDB,
          attributes: ['name'],
          through: {
            attributes: ['quantity', 'reason']
          }
        }
      ],
    });
  
    if(!Return){
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
  } catch (error) {
    console.log(error)
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const create = async (data: ReturnInterface) => {
    const t = await sequelize.transaction();
    try {
      const returnDelivery = await DeliveryDB.findOne({
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
      if (!medications?.[0]) {
        return {
          message: `No medications provided`,
          status: 400,
          data: {},
        };
      }
  
      const Return = await  ReturnDB.create({
        ...data,
      }, {transaction: t});
  
      const medicationArray = medications!.map((medication) => {
        return {
          return_id: Return.id,
          medication_id: medication.medication_id,
          quantity: medication.quantity,
          reason: medication.reason,
        };
      });
  
      await ReturnDetailsDB.bulkCreate(medicationArray, { transaction: t });
      const returnResponse = await ReturnDB.findOne({
        where: { id: Return.id },
        attributes: { exclude: ['updatedAt'] },
        include: [
          {
            model: MedicationDB,
            attributes: ['name'],
            through: {
              attributes: ['quantity', 'reason']
            }
          }
        ],
        transaction: t,
      });
  
      await t.commit();
  
      return {
        message: `Successful Return created`,
        status: 200,
        data: {
          Return: returnResponse,
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
  
