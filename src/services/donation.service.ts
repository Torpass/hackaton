import { CategoryDB, CharityDB, DonationDB } from "../config/sequelize.conf";
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
  try {
    const Donation = await  DonationDB.create({
      ...data
    });
    return {
      message: `Successful Donation created`,
      status: 200,
      data: {
        Donation: Donation,
      },
    };
  } catch (error) {
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


