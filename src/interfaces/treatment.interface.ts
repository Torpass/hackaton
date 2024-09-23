import { Model, Optional } from "sequelize";

export interface TreatmentInterface {
    id?: number;
    patient_id: number;
    observation: string;
    status: "not supplied" | "partially supplied" | "supplied";
    medications?:[
        {
            medication_id:number;
            quantity:string
        }
    ]
    createdAt?: Date;
    updatedAt?: Date;
}

interface TreatmentCreationAttributes extends Optional<TreatmentInterface, "id"> {}

export interface TreatmentInstance extends Model<TreatmentInterface, TreatmentCreationAttributes>, TreatmentInterface {}