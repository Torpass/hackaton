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

export const getUrgency = async () => {
  try {
    const medicationsRequired:any = await sequelize.query(`
       SELECT 
        m.id AS medication_id,
        m.name AS medication_name,
        COALESCE(SUM(mt.quantity), 0) AS total_required,  -- Total requerido en tratamientos
        m.quantity AS inventory_available,  -- Cantidad disponible en inventario
        (COALESCE(SUM(mt.quantity), 0) - m.quantity) AS shortage  -- Diferencia entre requerido y disponible
      FROM 
        medications AS m
      LEFT JOIN 
        medication_treatments AS mt ON m.id = mt.medication_id  -- Unimos las medicinas con los tratamientos
      GROUP BY 
        m.id  -- Agrupamos por medicamento
      HAVING 
        (COALESCE(SUM(mt.quantity), 0) - m.quantity) > 0  -- Solo mostrar medicamentos con escasez
      ORDER BY 
        shortage DESC  -- Ordenamos de mayor a menor escasez
    `, );


    return {
      message: `Successful Medication connection`,
      status: 200,
      data: {
        Medication: medicationsRequired[0],
      },
    };
  } catch (error) {
    console.log(error)
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
}

export const getMostDonatedMedicaments = async () => {
  try {
    const medicationsRequired:any = await sequelize.query(`
    SELECT 
      md.medication_id,
      m.name AS medication_name,
      COUNT(md.medication_id) AS donation_count,  
      SUM(md.quantity) AS total_donated
    FROM 
      medication_donations AS md
      INNER JOIN medications AS m ON m.id = md.medication_id  
    GROUP BY 
      md.medication_id, m.name  
    ORDER BY 
      total_donated DESC  
    `, );

    return {
      message: `Successful Medication connection`,
      status: 200,
      data: {
        Medication: medicationsRequired[0],
      },
    };
  }catch (error) {
    console.log(error)
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
}

export const getMostRequeriedByCommunity = async () => {
  try {
    const medicationsRequired:any = await sequelize.query(`
    SELECT 
  t.community_name,
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'medication_name', t.medication_name,
      'total_medicamentos_necesitados', t.total_medicamentos_necesitados
    )
  ) AS medications
FROM 
  (
    SELECT 
      c.name AS community_name,
      m.name AS medication_name,
      SUM(mt.quantity) AS total_medicamentos_necesitados
    FROM 
      medications AS m
      INNER JOIN medication_treatments AS mt ON m.id = mt.medication_id
      INNER JOIN treatments AS t ON mt.treatment_id = t.id
      INNER JOIN patients AS p ON t.patient_id = p.id
      INNER JOIN communities AS c ON p.community_id = c.id
    GROUP BY 
      c.name, m.name
  ) AS t
GROUP BY 
  t.community_name
ORDER BY 
  t.community_name;
    `, );

    return {
      message: `Successful Medication connection`,
      status: 200,
      data: {
        Medication: medicationsRequired[0],
      },
    };
  }catch (error) {
    console.log(error)
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
  
}


