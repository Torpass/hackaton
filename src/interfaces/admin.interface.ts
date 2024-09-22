export interface AdminInterface {
    id?: number;
    first_name: string;
    last_name: string;
    cedula: string;
    password: string;
    status: "active" | "inactive" | "deleted";
    createdAt?: Date;
    updatedAt?: Date;
}