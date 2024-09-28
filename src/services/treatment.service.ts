import { TreatmentDB, PatientDB, sequelize, MedicationTreatmentDB, MedicationDB, PathologyDB } from "../config/sequelize.conf";
import { TreatmentInterface } from "../interfaces";

export const getAll = async () => {
  try {
    const Treatment = await  TreatmentDB.findAll({
      where:{active:'active'},
      attributes: { exclude: ['updatedAt'] },
      include: [
        {
          model: MedicationDB,
          attributes: ['id', 'name', 'quantity'],
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
      where:{patient_id: id, active:'active'},
      attributes: { exclude: ['updatedAt'] },
      include: [
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
    const patient = await PatientDB.findOne({
      where: { id: data.patient_id } 
    });

    if (!patient) {
      return {
        message: `Patient with id ${data.patient_id} does not exist`,
        status: 400,
        data: {}
      };
    }

    const lasTreatment = await TreatmentDB.findOne({
      order: [["id", "DESC"]],
      limit: 1,
      transaction: t
    })


    const lastId = lasTreatment ? lasTreatment.id! + 1 : 0;

    const {medications} = data;

    const Treatment = await TreatmentDB.create({
      id: lastId,
      ...data
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
          model: MedicationDB,
          attributes: ['name', 'id'],
          through: {
            attributes: ['quantity',]
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
  const t = await sequelize.transaction();
  try {
    const treament = await TreatmentDB.findOne({
      where: {id} 
    });

    if (!treament) {
      return {
        message: `Treament with id ${id} does not exist`,
        status: 400,
        data: {}
      };
    }

    const {medications} = data;

    await TreatmentDB.update({
      ...data
    }, {where: {id}, transaction: t});

    const medicationArray = medications!.map((medication) => {
      return {
        treatment_id: id,
        medication_id: medication.medication_id,
        quantity: medication.quantity,
      }
    });

    await MedicationTreatmentDB.destroy({
      where: {treatment_id: id},
      transaction:t
    });

    await MedicationTreatmentDB.bulkCreate(medicationArray, {transaction: t});

    const treatement = await TreatmentDB.findOne({
      where: {id},
      attributes: { exclude: ['updatedAt'] },
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
      message: `Successful Treatment created`,
      status: 200,
      data: {
        Treatment: treatement,
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

export const deleteTreatment = async (id:number) => {
  try {
    const Treatment = await  TreatmentDB.update(
      {active:"deleted"},
      {where:{patient_id: id}}
    );

    return {
      message: `Patient with id ${id} Successfully deleted`,
      status: 200,
    };
  } catch (error) {
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

