import { Model, Optional } from "sequelize";

export interface PatientInterface {
    id?: number;
    community_id: number;
    first_name: string;
    last_name: string;
    birth_date: Date;
    email: string;
    id_card: string;
    phone: string;
    address: string;
    gender: string;
    status: "active" | "inactive" | "deleted";
    pathologies?:[
        {
            id_pathology:number;
            description:string
        }
    ]
    images?: {
        url: string;
      }[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface PatientCreationAttributes extends Optional<PatientInterface, "id"> {}

export interface PatientInstance extends Model<PatientInterface, PatientCreationAttributes>, PatientInterface {}