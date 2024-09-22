import { where } from "sequelize";
import { AdminDB } from "../config/sequelize.conf";
import { AdminInterface } from "../interfaces";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const TOKEN_EXPIRATION = '1h';
const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
  throw new Error('JWT_SECRET no está definido en las variables de entorno');
}
export const getAll = async () => {
  try {
    const Admin = await  AdminDB.findAll({
    });
    return {
      message: `Successful Admin connection`,
      status: 200,
      data: {
        Admin: Admin,
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
        const Admin = await  AdminDB.findAll({
        where:{status:"active"},
      });
      return {
        message: `Successful Admin connection`,
        status: 200,
        data: {
            Admin: Admin,
        },
      };
    } catch (error) {
      return {
        message: `Contact the administrator: error`,
        status: 500,
      };
    }
};

export const create = async (data:AdminInterface) => {
  try {
    const adminCedula = await  AdminDB.findOne({
      where:{cedula: data.cedula}
    });
      
    if (adminCedula) {
      return {
        message: `Admin with cedula ${data.cedula} already exists`,
        status: 400, 
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const adminData = {
      ...data,
      password: hashedPassword, 
    };
    const Admin = await AdminDB.create(adminData);
    return {
      message: `Successful Admin created`,
      status: 200,
      data: {
        Admin: Admin,
    },
    };
  } catch (error) {
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const update = async (id:number, data:AdminInterface) => {
  try {
    const admin = await  AdminDB.findOne({
      where:{id}
      });
      
    if(!admin){
    return {
      message: `Admin with id ${id} not found`,
      status: 404,
      };
    }

    const Admin = await  AdminDB.update({
        ...data
      },{
      where:{id}
    });

    const AdminUpdated = await  AdminDB.findOne({where:{id}});

    return {
      message: `Successful Admin updted`,
      status: 200,
      data: {
        Admin: AdminUpdated,
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

export const deleteAdmin = async (id:number) => {
  try {
    const Admin = await  AdminDB.update(
      {status:"deleted"},
      {where:{id}}
    );

    return {
      message: `Admin with id ${id} Successfully deleted`,
      status: 200,
    };
  } catch (error) {
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const login = async (data:AdminInterface) => {
  try {
    const adminActive = await AdminDB.findOne({ where: { cedula: data.cedula, status:data.status === 'active' } });
    if (!adminActive) {
      return {
      message: 'Usuario no registrado',
      status: 400, 
      };
    }
    const password = adminActive.get('password') as string;

    const isValid = await bcrypt.compare(data.password, password);
    if (!isValid) {
      return {
        message: 'Clave incorrecta',
        status: 400, 
      }
    }

    const token = jwt.sign({
      id: data.id,
      cedula: data.cedula,
    }, SECRET_KEY, {
      expiresIn: TOKEN_EXPIRATION
    });

    return {
      message: `Successful Admin login`,
      status: 200,
      data: {
        Admin: adminActive,
        token
    },
    };
  } catch (error) {
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};


