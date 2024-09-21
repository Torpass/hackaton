import { CharityDB } from "../config/sequelize.conf";
import { CharityInterface } from "../interfaces";

export const getAll = async () => {
  try {
    const Charity = await  CharityDB.findAll();
    return {
      message: `Successful Charity connection`,
      status: 200,
      data: {
        Charity: Charity,
      },
    };
  } catch (error) {
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const getAllActive = async () => {
    try {
      const Charity = await  CharityDB.findAll({
        where:{status:"active"}
      });
      return {
        message: `Successful Charity connection`,
        status: 200,
        data: {
          Charity: Charity,
        },
      };
    } catch (error) {
      return {
        message: `Contact the administrator: error`,
        status: 500,
      };
    }
};

export const create = async (data:CharityInterface) => {
  try {
    const Charity = await  CharityDB.create({
      ...data
    });
    return {
      message: `Successful Charity created`,
      status: 200,
      data: {
        Charity: Charity,
      },
    };
  } catch (error) {
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const update = async (id:number, data:CharityInterface) => {
  try {
    const Charity = await  CharityDB.findOne({
      where:{id}
      });
      
    if(!Charity){
    return {
      message: `Charity with id ${id} not found`,
      status: 404,
      };
    }

    const charityUpdted = await  CharityDB.update({
        ...data
      },{
      where:{id}
    });

    const CharityUpdated = await  CharityDB.findOne({where:{id}});

    return {
      message: `Successful Community updted`,
      status: 200,
      data: {
        Community: CharityUpdated,
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

export const deleteCharity = async (id:number) => {
    try {
      const Charity = await  CharityDB.update(
        {status:"deleted"},
        {where:{id}}
      );

      return {
        message: `Charity with id ${id} Successfully deleted`,
        status: 200,
      };
    } catch (error) {
      return {
        message: `Contact the administrator: error`,
        status: 500,
      };
    }
  };
