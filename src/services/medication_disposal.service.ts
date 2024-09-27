import { MedicationDB, MedicationDisposalDB} from "../config/sequelize.conf";
import { MedicationDisposal } from "../interfaces";
import {sequelize} from "../config/db";

export const getAll = async () => {
  try {
    const Medication = await  MedicationDisposalDB.findAll({
      include: [
        {
            model: MedicationDB,
            as: 'medication',
            attributes: ['name']
        }
    ],
    attributes: {exclude: ['medication_id', 'id', 'updatedAt']}
    });
    
    return {
      message: `Successful Medication connection`,
      status: 200,
      data: {
        MedicationDisposal: Medication,
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
    const MedicationDisposal = await  MedicationDisposalDB.findOne({
      where:{id},
      include: [
        {
            model: MedicationDB,
            as: 'medication',
            attributes: ['name']
        }
    ],
    attributes: {exclude: ['medication_id', 'id']}
    });
    if(!MedicationDisposal){
      return {
        message: `Medication with id ${id} not found`,
        status: 404,
      };
    }
    return {
      message: `Successful Medication connection`,
      status: 200,
      data: {
        MedicationDisposal: MedicationDisposal,
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


export const create = async (data:MedicationDisposal) => {
  try {
    const t = await sequelize.transaction(async (t) =>{

        const medication = await MedicationDB.findOne({
            where: {id:data.medication_id}
        })

        if(!medication){
            return {
                message: `Medication with id ${data.medication_id} not found`,
                status: 404,
            }
        }
        
        const {quantity:medicationRemining} = medication.dataValues
        
        if(data.quantity > medicationRemining){
            return {
                message: "Error: no puedes eliminar mas medicamentos que los que tienes en stock",
                status:400,
            }
        }

        await MedicationDB.decrement('quantity', {
            by: data.quantity,
            where: {id:data.medication_id},
            transaction: t
        })

        const medicationDisposal = await MedicationDisposalDB.create({
            ...data
        }, {transaction: t})

        return {
            message: `Successful Medication created`,
            status: 200,
            data: {
              Medication: medicationDisposal,
            },
          };
    })
    if(!t){
        return {
            message: `something went wrong`,
            status: 500,
            data: {}
          };
    }

    return t;
  } catch (error) {
    console.log(error)
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const update = async (id:number, data:MedicationDisposal) => {
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


