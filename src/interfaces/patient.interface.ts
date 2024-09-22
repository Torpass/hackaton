export interface PatientInterface {
    id?: number;
    community_id: number;
    first_name: string;
    last_name: string;
    birthday: Date;
    email: string;
    cedula: string;
    phone: string;
    address: string;
    gender: string;
    status: "active" | "inactive" | "deleted";
    createdAt?: Date;
    updatedAt?: Date;
}