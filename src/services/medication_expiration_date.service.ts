import {  MedicationDB, MedicationExpirationDateDB} from "../config/sequelize.conf";
import { MedicationExpirationDate } from "../interfaces";
import {sequelize} from "../config/db";

export const getAll = async () => {
  try {
    const Medication = await  MedicationExpirationDateDB.findAll({
      include: [
            {
                model: MedicationDB,
                as: 'medication',
                attributes: ['name']
            }
        ],
    });
    
    return {
      message: `Successful MedicationExpiration connection`,
      status: 200,
      data: {
        MedicationExpirationDate: Medication,
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
    const MedicationExpirationDate = await  MedicationExpirationDateDB.findOne({
      where:{id},
      include: [
        {
            model: MedicationDB,
            as: 'medication',
            attributes: ['name']
        }
    ],
    });
    if(!MedicationExpirationDate){
      return {
        message: `Medication with id ${id} not found`,
        status: 404,
      };
    }
    return {
      message: `Successful Medication connection`,
      status: 200,
      data: {
        MedicationExpirationDate: MedicationExpirationDate,
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


export const create = async (data:MedicationExpirationDate) => {
  try {
    const t = await sequelize.transaction(async (t) =>{
        const medication = await MedicationDB.findOne({
            where: {id:data.medication_id}
        })

        const {quantity:medicationRemining} = medication?.dataValues
        
        if(data.quantity >= medicationRemining){
            return {
                message: "Error: no puedes eliminar mas medicamentos que los que tienes en stock",
                status:400,
            }
        }


        // Sumar las cantidades ya registradas en la tabla fecha_vencimiento_medicamentos
        const cantidadRegistrada = await MedicationExpirationDateDB.sum('quantity', {
            where: { medication_id: data.medication_id }
        });

        const cantidadTotal = cantidadRegistrada + data.quantity;

        // Verificar si la nueva cantidad excede la cantidad disponible en medicamentos
        if (cantidadTotal > medicationRemining) {
            return {
                message: `Error: no puedes registrar mas medicamentos que los que tienes en stock`,
                status: 400,
                data: {}
              };       
        }

        const MedicationExpirationDate = await MedicationExpirationDateDB.create({
            ...data
        }, {transaction: t});

        const MedicationExpirationDateCreated = await MedicationExpirationDateDB.findOne({
            where: {id:MedicationExpirationDate.id},
            include: [
                {
                    model: MedicationDB,
                    as: 'medication',
                    attributes: ['name']
                }
            ],
            transaction: t
        });

        return {
            message: `Successful Medication created`,
            status: 200,
            data: {
              MedicationExpiration: MedicationExpirationDateCreated,
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

export const update = async (id:number, data:MedicationExpirationDate) => {
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


