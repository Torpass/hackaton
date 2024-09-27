import { where } from "sequelize";
import { AdminDB } from "../config/sequelize.conf";
import { AdminInterface } from "../interfaces";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const TOKEN_EXPIRATION = "1h";
const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
  throw new Error("JWT_SECRET no está definido en las variables de entorno");
}
export const getAll = async () => {
  try {
    const Admin = await AdminDB.findAll({});
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
    const Admin = await AdminDB.findAll({
      where: { status: "active" },
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

export const create = async (data: AdminInterface) => {
  try {
    const userEmail = await AdminDB.findOne({
      where: { email: data.email },
    });

    if (userEmail) {
      return {
        message: `User with cedula ${data.email} already exists`,
        status: 400,
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = {
      ...data,
      password: hashedPassword,
    };
    const User = await AdminDB.create(userData);
    return {
      message: `Successful User created`,
      status: 200,
      data: {
        User: User,
      },
    };
  } catch (error) {
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const update = async (id: number, data: AdminInterface) => {
  try {
    const user = await AdminDB.findOne({
      where: { id },
    });

    if (!user) {
      return {
        message: `User with id ${id} not found`,
        status: 404,
      };
    }

    const User = await AdminDB.update(
      {
        ...data,
      },
      {
        where: { id },
      }
    );

    const UserUpdated = await AdminDB.findOne({ where: { id } });

    return {
      message: `Successful User updted`,
      status: 200,
      data: {
        User: UserUpdated,
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

export const deleteUser = async (id: number) => {
  try {
    const User = await AdminDB.update({ status: "deleted" }, { where: { id } });

    return {
      message: `User with id ${id} Successfully deleted`,
      status: 200,
    };
  } catch (error) {
    return {
      message: `User the administrator: error`,
      status: 500,
    };
  }
};

export const login = async (data: AdminInterface) => {
  try {
    const userActive = await AdminDB.findOne({
      where: {
        email: data.email,
        status: "active",
      },
    });
    if (!userActive) {
      return {
        message: "Usuario no registrado",
        status: 400,
      };
    }
    const password = userActive.get("password") as string;

    const isValid = await bcrypt.compare(data.password, password);
    if (!isValid) {
      return {
        message: "Clave incorrecta",
        status: 400,
      };
    }

    const token = jwt.sign(
      {
        id: data.id,
        name: data.first_name + data.last_name,
        userType: data.userType,
      },
      SECRET_KEY,
      {
        expiresIn: TOKEN_EXPIRATION,
      }
    );

    return {
      message: `Successful Admin login`,
      status: 200,
      data: {
        Admin: userActive,
        token,
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
