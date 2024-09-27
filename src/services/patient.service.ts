import e from "express";
import {
  CommunityDB,
  DeliveryDB,
  MedicalHistoryDB,
  MedicationDB,
  PathologyDB,
  PathologyPatientDB,
  PatientDB,
  ReturnDB,
  sequelize,
  TreatmentDB,
} from "../config/sequelize.conf";
import { PatientInterface } from "../interfaces";

export const getAll = async () => {
  try {
    const Patient = await PatientDB.findAll({
      attributes: { exclude: ["community_id", "updatedAt"] },
      include: [
        {
          model: CommunityDB,
          as: "community",
          attributes: ["name"],
        },
        {
          model: PathologyDB,
          as: "pathologies",
          attributes: ["name"],
          through: {
            attributes: ["description"],
          },
        },
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

export const getById = async (id: number) => {
  try {
    const Patient = await PatientDB.findOne({
      where: { id_card: id },
      attributes: { exclude: ["id", "community_id", "updatedAt"] },
      include: [
        {
          model: CommunityDB,
          as: "community",
          attributes: ["name"],
        },
        {
          model: PathologyDB,
          as: "pathologies",
          attributes: ["name"],
          through: {
            attributes: ["description"],
          },
        },
      ],
    });

    if (!Patient) {
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
    console.log(error);
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const getFullPatient = async (id: number) => {
  try {
    const Patient = await PatientDB.findOne({
      where: { id_card: id },
    });

    if (!Patient) {
      return {
        message: `Patient with id ${id} not found`,
        status: 404,
      };
    }

    const patientFicha = await PatientDB.findOne({
      where: { id: Patient!.id },
      attributes: { exclude: ["community_id", "updatedAt"] },
      include: [
        //patologías del paciente
        {
          model: PathologyDB,
          through: { attributes: [] },
          attributes: ["name"],
        },
        //tratamientos del paciente
        {
          model: TreatmentDB,
          attributes: { exclude: ["patient_id", "updatedAt"] },
          include: [
            {
              model: MedicationDB,
              attributes: {
                exclude: ["quantity", "createdAt", "updatedAt"],
              },
              through: {
                attributes: ["quantity"],
                as: "medication_quantity",
              },
            },
          ],
        },
        //medicamentos del paciente
        {
          model: DeliveryDB,
          include: [
            {
              model: MedicationDB,
              through: { attributes: ["quantity"] },
              attributes: ["name"],
            },
            {
              model: ReturnDB,
              include: [
                {
                  model: MedicationDB,
                  attributes: {
                    exclude: ["quantity", "createdAt", "updatedAt"],
                  },
                  through: { attributes: ["quantity"] },
                },
              ],
            },
          ],
        },
      ],
    });

    return {
      message: `Successful Patient connection`,
      status: 200,
      data: {
        Patient: patientFicha,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const getAllActive = async () => {
  try {
    const Patient = await PatientDB.findAll({
      where: { status: "active" },
      attributes: { exclude: ["community_id", "updatedAt"] },
      include: [
        {
          model: CommunityDB,
          as: "community",
          attributes: ["name"],
        },
        {
          model: PathologyDB,
          as: "pathologies",
          attributes: ["name"],
          through: {
            attributes: ["description"],
          },
        },
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

export const create = async (data: PatientInterface) => {
  const t = await sequelize.transaction();
  try {
    const lastPatient = await PatientDB.findOne({
      order: [["id", "DESC"]],
      transaction: t,
    });

    const newPatientId = lastPatient ? lastPatient.id! + 1 : 1;

    const patientCedula = await PatientDB.findOne({
      where: { id_card: data.id_card },
    });

    if (patientCedula) {
      return {
        message: `patient with cedula ${data.id_card} already exists`,
        status: 400,
        data: {},
      };
    }

    const { pathologies, images } = data;
    console.log(pathologies);
    console.log(images);

    const Patient = await PatientDB.create(
      {
        id: newPatientId,
        ...data,
      },
      { transaction: t }
    );

    if (!pathologies) {
      throw new Error("Pathologies is required");
    }

    const lastRecord = await PathologyPatientDB.findOne({
      order: [["id", "DESC"]],
      attributes: ["id"],
    });

    let pathologyPatientId = lastRecord ? (lastRecord.get("id") as number) : 0;

    const newPathologies = pathologies.map((pathology) => {
      pathologyPatientId++;
      return {
        id: pathologyPatientId,
        patient_id: Patient.id,
        pathology_id: pathology.id_pathology,
        description: pathology.description,
      };
    });

    await PathologyPatientDB.bulkCreate(newPathologies, { transaction: t });

    // const imagesArray = images!.map((image) => {
    //   return {
    //     patient_id: Patient.id,
    //     url: image,
    //   }
    // });

    // await MedicalHistoryDB.bulkCreate(imagesArray, { transaction: t });

    const patient = await PatientDB.findOne({
      where: { id: Patient.id },
      attributes: { exclude: ["id", "community_id", "updatedAt"] },
      include: [
        {
          model: CommunityDB,
          as: "community",
          attributes: ["name"],
        },
        {
          model: PathologyDB,
          as: "pathologies",
          attributes: ["name"],
          through: {
            attributes: ["description"],
          },
        },
        {
          model: MedicalHistoryDB,
          attributes: ["url"],
        },
      ],
      transaction: t,
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
export const update = async (id: number, data: PatientInterface) => {
  const t = await sequelize.transaction();
  try {
    const patientCedula = await PatientDB.findOne({
      where: { id },
    });

    if (!patientCedula) {
      return {
        message: `patient with id:${data.id_card} doenst exists`,
        status: 400,
        data: {},
      };
    }

    const { pathologies } = data;

    await PatientDB.update(
      {
        ...data,
      },
      { where: { id }, transaction: t }
    );

    const pathologiesArray = pathologies!.map((pathology) => {
      return {
        patient_id: id,
        pathology_id: pathology.id_pathology,
        description: pathology.description,
      };
    });

    //delete all pathologies of the patient
    await PathologyPatientDB.destroy({
      where: { patient_id: id },
      transaction: t,
    });

    await PathologyPatientDB.bulkCreate(pathologiesArray, { transaction: t });
    const patient = await PatientDB.findOne({
      where: { id },
      attributes: { exclude: ["id", "community_id", "updatedAt"] },
      include: [
        {
          model: CommunityDB,
          as: "community",
          attributes: ["name"],
        },
        {
          model: PathologyDB,
          as: "pathologies",
          attributes: ["name"],
          through: {
            attributes: ["description"],
          },
        },
      ],
      transaction: t,
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
};

export const getPriorityPatients = async () => {
  try {
    const vulnerablePatients = await PatientDB.findAll({
      where: {
        status: "active", // Solo pacientes activos
      },
      attributes: [
        "first_name",
        "last_name",
        "id_card",
        "economic_status",
        "vulnerability_level",
        "phone",
        "address",
      ],
      order: [
        sequelize.literal(`
          CASE 
            WHEN vulnerability_level = 'muy critico' THEN 1
            WHEN vulnerability_level = 'critico' THEN 2
            WHEN vulnerability_level = 'medio' THEN 3
            WHEN vulnerability_level = 'bajo' THEN 4
            WHEN vulnerability_level = 'no especificado' THEN 5
            ELSE 6
          END
        `),
        sequelize.literal(`
          CASE 
            WHEN economic_status = 'clase baja' THEN 1
            WHEN economic_status = 'clase media baja' THEN 2
            WHEN economic_status = 'clase media' THEN 3
            WHEN economic_status = 'clase media alta' THEN 4
            WHEN economic_status = 'clase alta' THEN 5
            ELSE 6
          END
        `),
      ],
    });

    return {
      message: `Successful Patient connection`,
      status: 200,
      data: {
        vulnerablePatients: vulnerablePatients,
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

export const getRangePatients = async (data: any) => {
  try {
    const { vulnerabilityLevel, economicStatus } = data;

    const filteredPatients = await PatientDB.findAll({
      where: {
        status: "active", // Solo pacientes activos
        ...data, // Aplicamos los filtros dinámicos
      },
      attributes: [
        "first_name",
        "last_name",
        "id_card",
        "economic_status",
        "vulnerability_level",
        "phone",
        "address",
      ],
    });

    return {
      message: `Successful Patient connection`,
      status: 200,
      data: {
        Patients: filteredPatients,
      },
    };
  } catch (error) {
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const getPatientsByCommunity = async () => {
  try {
    const Patients = await sequelize.query(`
      SELECT 
        c.id AS community_id,
        c.name AS community_name,
        COUNT(p.id) AS patient_count  -- Contamos el número de pacientes por comunidad
      FROM 
        communities AS c
      LEFT JOIN 
        patients AS p ON c.id = p.community_id  -- Unimos las comunidades con los pacientes
      GROUP BY 
        c.id, c.name  -- Agrupamos por ID y nombre de la comunidad
      ORDER BY 
        patient_count DESC  -- Ordenamos de mayor a menor cantidad de pacientes
      `);

    return {
      message: `Successful Patient connection`,
      status: 200,
      data: {
        Patients: Patients[0],
      },
    };
  } catch (error) {
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
}

export const deletePatient = async (id: number) => {
  try {
    const Patient = await PatientDB.update(
      { status: "deleted" },
      { where: { id } }
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
