import { TreatmentDB, PatientDB, sequelize, MedicationTreatmentDB, MedicationDB, PathologyDB } from "../config/sequelize.conf";
import { TreatmentInterface } from "../interfaces";

export const getAll = async () => {
  try {
    const Treatment = await  TreatmentDB.findAll({
      attributes: { exclude: ['id', 'patient_id', 'updatedAt'] },
      include: [
        {
          model: PatientDB,
          attributes: ['first_name', 'last_name', 'id_card'],
          include: [
            {
              model: PathologyDB, 
              attributes: ['name'], 
              through: {
                attributes: [],
              }
            }
          ]
        },
        {
          model: MedicationDB,
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
  } catch (error) {
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const getById = async (id:number) => {
  try {
    const Treatment = await  TreatmentDB.findOne({
      where:{id},
      attributes: { exclude: ['id', 'patient_id', 'updatedAt'] },
      include: [
        {
          model: PatientDB,
          attributes: ['first_name', 'last_name', 'id_card'],
          include: [
            {
              model: PathologyDB, 
              attributes: ['name'], 
              through: {
                attributes: [],
              }
            }
          ]
        },
        {
          model: MedicationDB,
          attributes: ['name', 'quantity'],
          through: {
            attributes: ['quantity']
          }
        }
      ],
    });
  
    if(!Treatment){
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
  } catch (error) {
    console.log(error)
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const create = async (data:TreatmentInterface) => {
  const t = await sequelize.transaction();
  try {
    const patientId = await  TreatmentDB.findOne({
      where:{patient_id: data.patient_id}
    });
      
    if (patientId) {
      return {
        message: `patient with id ${data.patient_id} already have a treatment`,
        status: 400, 
        data:{}
      };
    }

    const {medications} = data;

    const Treatment = await  TreatmentDB.create({
      ...data,
    }, {transaction: t});

    const medicationArray = medications!.map((medication) => {
      return {
        treatment_id: Treatment.id,
        medication_id: medication.medication_id,
        quantity: medication.quantity,
      }
    });

    await MedicationTreatmentDB.bulkCreate(medicationArray, {transaction: t});
    const treatement = await TreatmentDB.findOne({
      where: { id: Treatment.id },
      attributes: { exclude: ['id', 'patient_id', 'updatedAt'] },
      include: [
        {
          model: PatientDB,
          attributes: ['first_name', 'last_name', 'id_card'],
          include: [
            {
              model: PathologyDB, 
              attributes: ['name'], 
              through: {
                attributes: [],
              }
            }
          ]
        },
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
      message: `Successful Treatment created`,
      status: 200,
      data: {
        Treatment: treatement,
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

export const update = async (id:number, data:TreatmentInterface) => {
  try {
    const Treatment = await  TreatmentDB.findOne({
      where:{id}
      });
      
    if(!Treatment){
    return {
      message: `Treatment with id ${id} not found`,
      status: 404,
      };
    }

    const TreatmentUpted = await  TreatmentDB.update({
        ...data
      },{
      where:{id}
    });

    const TreatmentUpdated = await  TreatmentDB.findOne({where:{id}});

    return {
      message: `Successful Community updted`,
      status: 200,
      data: {
        Treatment: TreatmentUpdated,
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


