import { TreatmentDB, PatientDB } from "../config/sequelize.conf";
import { TreatmentInterface } from "../interfaces";

export const getAll = async () => {
  try {
    const Treatment = await  TreatmentDB.findAll({
        include: [
          {
            model: PatientDB,
            attributes: ['first_name', 'last_name', 'id_card']
          },
        ],
      })
    
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

export const getById = async (id:number) => {
  try {
    const Treatment = await  TreatmentDB.findOne({
      where:{id},
      include: [
        {
          model: PatientDB,
          attributes: ['first_name', 'last_name', 'id_card']
        },
      ]
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
  try {
    const Treatment = await  TreatmentDB.create({
      ...data
    });
    return {
      message: `Successful Treatment created`,
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


