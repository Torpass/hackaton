import { PathologyPatientDB, PathologyDB,PatientDB } from "../config/sequelize.conf";
import { Patient_Pathology_interface } from "../interfaces";

export const getAllPAtienPathology = async () => {
    try {
      const Pathologies = await  PatientDB.findAll({
        include:[
          {
            model: PathologyDB,
           
            attributes: ['name']
          }
        ]
      });
      return {
        message: `Successful Patient Pathology connection`,
        status: 200,
        data: {
          Pathologies: Pathologies,
        },
      };
    } catch (error) {
      return {
        message: `Contact the administrator: ${error}`,
        status: 500,
      };
    }
};
export const getPAtienPathologyByID = async (IdPatient:number) => {
    try {
      const Patient = await  PatientDB.findOne({
        where:{id:IdPatient},
        include:[
          {
            model: PathologyDB,
            attributes: ['name']
          }
        ]
      });
      return {
        message: `Successful Patient Pathology connection`,
        status: 200,
        data: {
          Patient: Patient,
        },
      };
    } catch (error) {
      return {
        message: `Contact the administrator: ${error} ${IdPatient}`,
        status: 500,
      };
    }
};

  
export const CreatePathologyPatient = async (data:Patient_Pathology_interface) => {
  try{
    const Patient_Pathology = await  PathologyPatientDB.create({
      ...data
    });
    return {
      message: `Successful Patient Pathology created`,
      status: 200,
      data: {
        Patient_Pathology: Patient_Pathology,
    },
    };
  }catch(error){
    return {
      message: `Contact the administrator: ${error}`,
      status: 500,
    };

  }
}

export const Delete = async (id_patien:number,id_Pathology:number) => {
    try {
      const Existpatient = await  PathologyPatientDB.findOne({where:{
            patient_id:id_patien,
            pathology_id:id_Pathology
        }});
        
        if(!Existpatient){

            return {
                    message: `Patient_Pathology with id ${id_Pathology} not found`,
                    status: 404,
            };
        }
  
      const RowsAffecteds = await  PathologyPatientDB.destroy({
        where:{ patient_id:id_patien,
            pathology_id:id_Pathology
        }
      });
  
     
      return {
        message: `Successful Patient_Pathology Deleted`,
        status: 200,
        data: {
          "RowsAffecteds": RowsAffecteds,
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
  