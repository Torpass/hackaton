import { where } from "sequelize";
import { CategoryDB } from "../config/sequelize.conf";
import { CategoryInterface } from "../interfaces";

export const getAll = async () => {
  try {
    const Category = await  CategoryDB.findAll();
    return {
      message: `Successful Category connection`,
      status: 200,
      data: {
        Category: Category,
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
      const Category = await  CategoryDB.findAll({
        where:{status:"active"}
      });
      return {
        message: `Successful Category connection`,
        status: 200,
        data: {
          Category: Category,
        },
      };
    } catch (error) {
      return {
        message: `Contact the administrator: error`,
        status: 500,
      };
    }
};

export const create = async (data:CategoryInterface) => {
  try {
    const Category = await  CategoryDB.create({
      ...data
    });
    return {
      message: `Successful Category created`,
      status: 200,
      data: {
        Category: Category,
      },
    };
  } catch (error) {
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const update = async (id:number, data:CategoryInterface) => {
  try {
    const category = await  CategoryDB.findOne({
      where:{id}
      });
      
    if(!category){
    return {
      message: `Category with id ${id} not found`,
      status: 404,
      };
    }

    const Category = await  CategoryDB.update({
        ...data
      },{
      where:{id}
    });

    const categoryUpdated = await  CategoryDB.findOne({where:{id}});

    return {
      message: `Successful Community updted`,
      status: 200,
      data: {
        Community: categoryUpdated,
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

export const deleteCategory = async (id:number) => {
    try {
      const Category = await  CategoryDB.update(
        {status:"deleted"},
        {where:{id}}
      );

      return {
        message: `Catery with id ${id} Successfully deleted`,
        status: 200,
      };
    } catch (error) {
      return {
        message: `Contact the administrator: error`,
        status: 500,
      };
    }
  };
