export interface AdminInterface {
  id?: number;
  first_name: string;
  last_name: string;
  cedula: string;
  email: string;
  password: string;
  status: "active" | "inactive" | "deleted";
  userType: "admin" | "donor";
  createdAt?: Date;
  updatedAt?: Date;
}
