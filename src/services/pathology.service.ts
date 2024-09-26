import { PathologyDB } from "../config/sequelize.conf";
import { PathologyInterface } from "../interfaces";

export const getAll = async () =>{
    try{
        const pathologies = await PathologyDB.findAll();
        return {
            message: `Successful Pathology connection`,
            status: 200,
            data: {
                pathologies: pathologies,
            },
          };
    }catch(error){
        console.log(error)
        return {
        message: `Contact the administrator: error`,
        status: 500,
        };
      }
}

export const getById = async (id:number) => {
    try {
        
        const Pathology = await  PathologyDB.findOne({
        where:{ id }, });
      
        if( !Pathology ){
        return {
          message: `Pathology with id ${id} not found`,
          status: 404,
        };
      }
      return {
        message: `Successful Pathology connection`,
        status: 200,
        data: {
          Donation: Pathology,
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

  export const create = async (data:PathologyInterface) => {

    const lastPathology = await PathologyDB.findOne({
      order: [['id', 'DESC']],
    });

    const newId = lastPathology ? lastPathology.id! + 1 : 1;

    try {
      const Pathology = await  PathologyDB.create({
        id: newId,
        ...data,
      });
      return {
        message: `Successful Pathology created`,
        status: 200,
        data: {
            Pathology: Pathology,
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

  
  export const update = async (id:number, data:PathologyInterface) => {
    try {
      const Pathology = await  PathologyDB.findOne({
        where:{id}
        });
        
      if(!Pathology){
      return {
        message: `Pathology with id ${id} not found`,
        status: 404,
        };
      }
  
      const PathologyUpdted = await  PathologyDB.update({
          ...data
        },{
        where:{id}
      });
  
      const PathologyUpdated = await  PathologyDB.findOne({where:{id}});
  
      return {
        message: `Successful Pathology updted`,
        status: 200,
        data: {
          Community: PathologyUpdated,
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
  