import { MedicationDB } from "../config/sequelize.conf";
import { MedicationInterface } from "../interfaces";

export const getAll = async () => {
  try {
    const Medication = await  MedicationDB.findAll({})
    
    return {
      message: `Successful Medication connection`,
      status: 200,
      data: {
        Medication: Medication,
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

export const getById = async (id:number) => {
  try {
    const Medication = await  MedicationDB.findOne({
      where:{id},
    });
        
    if(!Medication){
      return {
        message: `Medication with id ${id} not found`,
        status: 404,
      };
    }
    return {
      message: `Successful Medication connection`,
      status: 200,
      data: {
        Medication: Medication,
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


export const create = async (data:MedicationInterface) => {
  try {
    const lastMedication = await MedicationDB.findOne({
      order: [['id', 'DESC']],
    });

    const newId = lastMedication ? lastMedication.id! + 1 : 1;

    const Medication = await  MedicationDB.create({
      id: newId,
      ...data
    });
    
    return {
      message: `Successful Medication created`,
      status: 200,
      data: {
        Medication: Medication,
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

export const update = async (id:number, data:MedicationInterface) => {
  try {
    const Medication = await  MedicationDB.findOne({
      where:{id}
      });
      
    if(!Medication){
    return {
      message: `Medication with id ${id} not found`,
      status: 404,
      };
    }

    const MedicationUpdted = await  MedicationDB.update({
        ...data
      },{
      where:{id}
    });

    const MedicationUpdated = await  MedicationDB.findOne({where:{id}});

    return {
      message: `Successful Community updted`,
      status: 200,
      data: {
        Community: MedicationUpdated,
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


