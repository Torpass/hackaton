import { CategoryDB, CharityDB, MedicationDonationDB,DonationDB, sequelize, MedicationDB } from "../config/sequelize.conf";
import { DonationInterface } from "../interfaces";

export const getAll = async () => {
  try {
    const Donation = await  DonationDB.findAll({
        include: [
          {
            model: CategoryDB,
            attributes: ['id', 'name', 'description']
          },
          {
            model: CharityDB,
            // attributes: ['id', 'name', 'description']
          }
        ],
        attributes: ['id', 'name', 'description', 'status', "createdAt"]
      })
    
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
      include: [
        {
          model: CategoryDB,
          attributes: ['id', 'name', "description"]
        },
        {
          model: CharityDB,
          // attributes: ['id', 'name', 'description']
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
          attributes: ['name']
        },
        {
          model: MedicationDB,
          attributes: ['name', 'quantity'],
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
    await t.rollback();
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};


export const update = async (id:number, data:DonationInterface) => {
  try {
    const Donation = await  DonationDB.findOne({
      where:{id}
      });
      
    if(!Donation){
    return {
      message: `Donation with id ${id} not found`,
      status: 404,
      };
    }

    const DonationUpdted = await  DonationDB.update({
        ...data
      },{
      where:{id}
    });

    const DonationUpdated = await  DonationDB.findOne({where:{id}});

    return {
      message: `Successful Community updted`,
      status: 200,
      data: {
        Community: DonationUpdated,
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


