import { MedicationDB, MedicationDonationDB, sequelize } from "../config/sequelize.conf";
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

export const getExpireSoon = async () => {
  try {
    const medicationsExpiringSoon:any = await sequelize.query(`
      SELECT 
        m.id AS medication_id,
        m.name AS medication_name,
        md.quantity,
        md.expiration_date
      FROM 
        medication_donations AS md
      INNER JOIN 
        medications AS m ON m.id = md.medication_id
      ORDER BY 
        md.expiration_date ASC
    `, );

    const today = new Date();
    const soon = new Date(today);
    soon.setDate(today.getDate() + 30);  // Medicamentos que vencen en 30 días
    
    const filteredMedications = medicationsExpiringSoon[0].filter((medication: any) => {
      const expirationDate = new Date(medication.expiration_date);
      return expirationDate > today;
    });

    
    return {
      message: `Successful Medication connection`,
      status: 200,
      data: {
        Medication: filteredMedications,
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

export const getExpired = async () => {
  try {
    const medicationsExpiringSoon:any = await sequelize.query(`
      SELECT 
        m.id AS medication_id,
        m.name AS medication_name,
        md.quantity,
        md.expiration_date
      FROM 
        medication_donations AS md
      INNER JOIN 
        medications AS m ON m.id = md.medication_id
      ORDER BY 
        md.expiration_date ASC
    `, );

    const today = new Date();
    const soon = new Date(today);
    soon.setDate(today.getDate() + 30);  // Medicamentos que vencen en 30 días
    
    const filteredMedications = medicationsExpiringSoon[0].filter((medication: any) => {
      const expirationDate = new Date(medication.expiration_date);
      return expirationDate < today  ;
    });

    
    return {
      message: `Successful Medication connection`,
      status: 200,
      data: {
        Medication: filteredMedications,
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




