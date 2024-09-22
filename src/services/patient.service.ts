import { where } from "sequelize";
import { CommunityDB, PatientDB } from "../config/sequelize.conf";
import { PatientInterface } from "../interfaces";

export const getAll = async () => {
  try {
    const Patient = await  PatientDB.findAll({
      include:[
        {
          model: CommunityDB,
          attributes: ['name']
        }
      ]
    });
    return {
      message: `Successful Patient connection`,
      status: 200,
      data: {
        Patient: Patient,
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
    const Patient = await PatientDB.findOne({
      where:{id_card:id},
      include:[
        {
          model: CommunityDB,
          attributes: ['name']
        }
      ]
    });
    if(!Patient){
      return {
        message: `Patient with id ${id} not found`,
        status: 404,
      };
    }
    return {
      message: `Successful Patient connection`,
      status: 200,
      data: {
        Patient: Patient,
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

export const getAllActive = async () => {
    try {
        const Patient = await  PatientDB.findAll({
        where:{status:"active"},
        include:[
          {
            model: CommunityDB,
            attributes: ['name']
          }
        ]
      });
      return {
        message: `Successful Patient connection`,
        status: 200,
        data: {
            Patient: Patient,
        },
      };
    } catch (error) {
      return {
        message: `Contact the administrator: error`,
        status: 500,
      };
    }
};

export const create = async (data:PatientInterface) => {
  try {
    const patientCedula = await  PatientDB.findOne({
      where:{id_card: data.id_card}
    });
      
    if (patientCedula) {
      return {
        message: `patient with cedula ${data.id_card} already exists`,
        status: 400, 
      };
    }
    const Patient = await  PatientDB.create({
      ...data
    });
    return {
      message: `Successful Patient created`,
      status: 200,
      data: {
        Patient: Patient,
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

export const update = async (id:number, data:PatientInterface) => {
  try {
    const patient = await  PatientDB.findOne({
      where:{id}
      });
      
    if(!patient){
    return {
      message: `Patient with id ${id} not found`,
      status: 404,
      };
    }

    const Patient = await  PatientDB.update({
        ...data
      },{
      where:{id}
    });

    const PatientUpdated = await  PatientDB.findOne({where:{id}});

    return {
      message: `Successful Patient updted`,
      status: 200,
      data: {
        Patient: PatientUpdated,
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

export const deletePatient = async (id:number) => {
    try {
      const Patient = await  PatientDB.update(
        {status:"deleted"},
        {where:{id}}
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
