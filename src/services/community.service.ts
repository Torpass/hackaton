import { CommunityDB } from "../config/sequelize.conf";
import { CommunityInterface } from "../interfaces";

export const getAll = async () => {
  try {
    const Communities = await  CommunityDB.findAll();
    return {
      message: `Successful Community connection`,
      status: 200,
      data: {
        Community: Communities,
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

export const create = async (data:CommunityInterface) => {
  try {
    const Community = await  CommunityDB.create({
      ...data
    });
    return {
      message: `Successful Community created`,
      status: 200,
      data: {
        Community: Community,
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

export const update = async (id:number, data:CommunityInterface) => {
  try {
    const community = await  CommunityDB.findOne({
      where:{id}
      });
      
    if(!community){
    return {
      message: `Community with id ${data.id} found`,
      status: 404,
      };
    }

    const Community = await  CommunityDB.update({
        ...data
      },{
      where:{id}
    });

    const communityUpdated = await  CommunityDB.findOne({where:{id}});

    return {
      message: `Successful Community updted`,
      status: 200,
      data: {
        Community: communityUpdated,
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


