import { CategoryDB, CharityDB, MedicationDonationDB,DonationDB, sequelize, MedicationDB } from "../config/sequelize.conf";
import { DonationInterface } from "../interfaces";

export const getAll = async () => {
  try {
    const Donation = await  DonationDB.findAll({
      attributes: { exclude: ['category_id', 'charity_id', 'updatedAt'] },
      include: [
        {
          model: CategoryDB,
          attributes: ['name', 'description']
        },
        {
          model: CharityDB,
          attributes: ['name']
        },
        {
          model: MedicationDB,
          attributes: ['name'],
          through: {
            as: 'medication_details',
            attributes: ['quantity', 'expiration_date'],
          }
        }

      ]
    });
    
    return {
      message: `Successful Donation connection`,
      status: 200,
      data: {
        Donation: Donation,
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
    const Donation = await  DonationDB.findOne({
      where:{id},
      attributes: { exclude: ['category_id', 'charity_id', 'updatedAt'] },
      include: [
        {
          model: CategoryDB,
          attributes: ['name', 'description']
        },
        {
          model: CharityDB,
          attributes: ['name']
        },
        {
          model: MedicationDB,
          attributes: ['name'],
          through: {
            as: 'medication_details',
            attributes: ['quantity', 'expiration_date'],
          }
        }

      ]
    });
    if(!Donation){
      return {
        message: `Donation with id ${id} not found`,
        status: 404,
      };
    }
    return {
      message: `Successful Donation connection`,
      status: 200,
      data: {
        Donation: Donation,
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


export const create = async (data:DonationInterface) => {
  const t = await sequelize.transaction();
  try {
    
    const {medications} = data;
    
    const Donation = await  DonationDB.create({
      ...data
    }, {transaction: t});

    const medicationArray = medications!.map((medication) => {
      return {
        donation_id: Donation.id,
        medication_id: medication.medication_id,
        quantity: medication.quantity,
        expiration_date: medication.expiration_date
      }
    });

    await MedicationDonationDB.bulkCreate(medicationArray, {transaction: t});
    
    for (const medication of medications!) {
      await MedicationDB.increment('quantity', {
          by: medication.quantity,
          where: { id: medication.medication_id },
          transaction: t
      });
    }

    await t.commit();

    const DonationCreated = await  DonationDB.findOne({
      where:{id:Donation.id},
      attributes: { exclude: ['category_id', 'charity_id', 'updatedAt'] },
      include: [
        {
          model: CategoryDB,
          attributes: ['name', 'description']
        },
        {
          model: CharityDB,
          attributes: ['razon_social']
        },
        {
          model: MedicationDB,
          attributes: ['name'],
          through: {
            as: 'medication_details',
            attributes: ['quantity', 'expiration_date'],
          }
        }

      ]
    });

    

    return {
      message: `Successful Donation created`,
      status: 200,
      data: {
        Donation: DonationCreated,
      },
    };
  } catch (error) {
    console.log(error)
    await t.rollback();
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};


export const update = async (id: number, data: DonationInterface) => {
  const t = await sequelize.transaction();
  try {
    const { medications } = data;

    // Buscar la donación existente
    const donation = await DonationDB.findByPk(id, { 
      include: [{ 
        model: MedicationDB, 
        as: 'medications', 
        through: { attributes: ['quantity',] }}],
      transaction: t 
    });
    if (!donation) {
      return {
        message: `Donation not found`,
        status: 404,
      };
    }

    const oldMedicationQuantity = await MedicationDonationDB.findAll({
      where: { donation_id: id },
      attributes: ['quantity', 'medication_id'],
      transaction: t,
    });

    

    // Actualizar los detalles de la donación
    await donation.update({ ...data }, { transaction: t });

    // Eliminar los registros de medicamentos asociados existentes
    await MedicationDonationDB.destroy({
      where: { donation_id: id },
      transaction: t,
    });


    // Decrementar la cantidad de medicamentos en el inventario en base a la cantidad anterior
    for (const oldMedication of oldMedicationQuantity!) {
      await MedicationDB.decrement('quantity', {
          by: oldMedication.quantity,
          where: { id: oldMedication.medication_id },
          transaction: t,
      });
    }


    // Crear nuevos registros de medicamentos asociados
    const medicationArray = medications!.map((medication) => {
      return {
        donation_id: id,
        medication_id: medication.medication_id,
        quantity: medication.quantity,
        expiration_date: medication.expiration_date,
      };
    });

    await MedicationDonationDB.bulkCreate(medicationArray, { transaction: t });

    // Actualizar la cantidad de medicamentos en el inventario
    for (const medication of medications!) {
      await MedicationDB.increment('quantity', {
        by: medication.quantity,
        where: { id: medication.medication_id },
        transaction: t,
      });
    }

    console.log("before commit")

    await t.commit();

    const DonationUpdated = await DonationDB.findOne({
      where: { id: donation.id },
      attributes: { exclude: ['category_id', 'charity_id', 'updatedAt'] },
      include: [
        {
          model: CategoryDB,
          attributes: ['name', 'description'],
        },
        {
          model: CharityDB,
          attributes: ['name'],
        },
        {
          model: MedicationDB,
          attributes: ['name'],
          through: {
            as: 'medication_details',
            attributes: ['quantity', 'expiration_date'],
          },
        },
      ],
    });

    return {
      message: `Successful Donation updated`,
      status: 200,
      data: {
        Donation: DonationUpdated,
      },
    };
  } catch (error) {
    await t.rollback();
    console.log(error)
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};