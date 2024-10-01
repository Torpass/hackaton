import { Model, Optional } from "sequelize";

export interface AdminInterface {
  id?: number;
  first_name: string;
  last_name: string;
  cedula: string;
  email: string;
  password: string;
  status: "active" | "inactive" | "deleted";
  userType: "admin" | "donor";
  razon_social?: string;
  description?: string;
  is_fundation?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AdminCreationAttributes extends Optional<AdminInterface, "id"> {}

export interface AdminInstance
  extends Model<AdminInterface, AdminCreationAttributes>,
    AdminInterface {}
