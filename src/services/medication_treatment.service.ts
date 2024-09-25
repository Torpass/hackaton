import { MedicationDB, TreatmentDB, MedicationTreatmentDB, MedicationDisposalDB} from "../config/sequelize.conf";
import { Medication_Treatment, MedicationDisposal } from "../interfaces";
import {sequelize} from "../config/db";

export const getAll = async () => {
  try {
    const Medication_Treatment = await  MedicationTreatmentDB.findAll({
      include: [
        {
            model: MedicationDB,
            attributes: ['name', 'quantity']
        },
        {
            model: TreatmentDB,
            attributes: ['observation', 'status']
        }
    ],
    });
    
    return {
      message: `Successful Medication_Treatment connection`,
      status: 200,
      data: {
        Medication_Treatment: Medication_Treatment,
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
    const Medication_Treatment = await  MedicationTreatmentDB.findOne({
      where:{id},
      include: [
        {
            model: MedicationDB,
            attributes: ['name', 'quantity']
        },
        {
            model: TreatmentDB,
            attributes: ['observation', 'status']
        }
    ],
    });
    if(!Medication_Treatment){
      return {
        message: `Medication with id ${id} not found`,
        status: 404,
      };
    }
    return {
      message: `Successful Medication_Treatment connection`,
      status: 200,
      data: {
        Medication_Treatment: Medication_Treatment,
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


export const create = async (data:Medication_Treatment) => {
  try {
    const t = await sequelize.transaction(async (t) =>{
        const medication = await MedicationDB.findOne({
            where: {id:data.medication_id}
        })

        const {quantity:medicationRemining} = medication?.dataValues
        
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


