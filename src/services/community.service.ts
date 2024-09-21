import { CommunityDB } from "../config/sequelize.conf";
import { CommunityInterface } from "../interfaces";

export const getAll = async () => {
  try {
    const Communities = await  CommunityDB.findAll();
    return {
      message: `Successful Community connection`,
      status: 200,
      data: {
        Areas: Communities,
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

