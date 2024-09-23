import { Model, Optional } from "sequelize";

export interface TreatmentInterface {
    id?: number;
    patient_id: number;
    observation: string;
    status: "no abastecido" | "parcialmente abastecido" | "abastecido";
    active: "active" | "inactive" | "deleted";
    medications?:[
        {
            medication_id:number;
            quantity:number
        }
    ]
    createdAt?: Date;
    updatedAt?: Date;
}

interface TreatmentCreationAttributes extends Optional<TreatmentInterface, "id"> {}

export interface TreatmentInstance extends Model<TreatmentInterface, TreatmentCreationAttributes>, TreatmentInterface {}