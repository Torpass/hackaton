import { CommunityDB, PathologyDB, PathologyPatientDB, PatientDB, sequelize } from "../config/sequelize.conf";
import { PatientInterface, } from "../interfaces";

export const getAll = async () => {
  try {
    const Patient = await  PatientDB.findAll({
      attributes: { exclude: ['id', 'community_id', 'updatedAt'] },
      include: [
        {
          model: CommunityDB,
          as: 'community',
          attributes: ['name']
        },
        {
          model: PathologyDB,
          as: 'pathologies',
          attributes: ['name'],
          through: {
            attributes: ['description']
          }
        }
      ],
    });
    return {
      message: `Successful Patient connection`,
      status: 200,
      data: {
        Patients: Patient,
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
      where: { id_card: id },
      attributes: { exclude: ['id', 'community_id', 'updatedAt'] },
      include: [
        {
          model: CommunityDB,
          as: 'community',
          attributes: ['name']
        },
        {
          model: PathologyDB,
          as: 'pathologies',
          attributes: ['name'],
          through: {
            attributes: ['description']
          }
        }
      ],
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
        attributes: { exclude: ['id', 'community_id', 'updatedAt'] },
        include: [
          {
            model: CommunityDB,
            as: 'community',
            attributes: ['name']
          },
          {
            model: PathologyDB,
            as: 'pathologies',
            attributes: ['name'],
            through: {
              attributes: ['description']
            }
          }
        ],
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
  const t = await sequelize.transaction();
  try { 
    const patientCedula = await  PatientDB.findOne({
      where:{id_card: data.id_card}
    });
      
    if (patientCedula) {
      return {
        message: `patient with cedula ${data.id_card} already exists`,
        status: 400, 
        data:{}
      };
    }

    const {pathologies} = data;

    const Patient = await  PatientDB.create({
      ...data,
    }, {transaction: t});

    const pathologiesArray = pathologies!.map((pathology) => {
      return {
        patient_id: Patient.id,
        pathology_id: pathology.id_pathology,
        description: pathology.description,
      }
    });

    await PathologyPatientDB.bulkCreate(pathologiesArray, {transaction: t});
    const patient = await PatientDB.findOne({
      where: { id: Patient.id },
      attributes: { exclude: ['id', 'community_id', 'updatedAt'] },
      include: [
        {
          model: CommunityDB,
          as: 'community',
          attributes: ['name']
        },
        {
          model: PathologyDB,
          as: 'pathologies',
          attributes: ['name'],
          through: {
            attributes: ['description']
          }
        }
      ],
      transaction: t
    });

    await t.commit();

    return {
      message: `Successful Patient created`,
      status: 200,
      data: {
        Patient: patient,
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


//TODO update patient
export const update = async (id:number, data:PatientInterface) => {
  const t = await sequelize.transaction();
  try { 
    const patientCedula = await  PatientDB.findOne({
      where:{id}
    });
      
    if (!patientCedula) {
      return {
        message: `patient with id:${data.id_card} doenst exists`,
        status: 400, 
        data:{}
      };
    }

    const {pathologies} = data;

    await  PatientDB.update({
      ...data,
      }, {where:{id}, transaction: t});

    const pathologiesArray = pathologies!.map((pathology) => {
      return {
        patient_id: id,
        pathology_id: pathology.id_pathology,
        description: pathology.description,
      }
    });

    //delete all pathologies of the patient
    await PathologyPatientDB.destroy({
      where: {patient_id: id},
      transaction: t
    });

    await PathologyPatientDB.bulkCreate(pathologiesArray, {transaction: t});
    const patient = await PatientDB.findOne({
      where: {id},
      attributes: { exclude: ['id', 'community_id', 'updatedAt'] },
      include: [
        {
          model: CommunityDB,
          as: 'community',
          attributes: ['name']
        },
        {
          model: PathologyDB,
          as: 'pathologies',
          attributes: ['name'],
          through: {
            attributes: ['description']
          }
        }
      ],
      transaction: t
    });

    await t.commit();

    return {
      message: `Successful Patient created`,
      status: 200,
      data: {
        Patient: patient,
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



