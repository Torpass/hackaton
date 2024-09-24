import { Model, Optional } from "sequelize";

export interface ReturnInterface {
    id?: number;
    delivery_id: number;
    reason: string;
    date: Date;
    medications?:[
        {
            medication_id:number;
            quantity:number;
            reason:string;
        }
    ]
    createdAt?: Date;
    updatedAt?: Date;
}

interface ReturnCreationAttributes extends Optional<ReturnInterface, "id"> {}

export interface ReturnInstance extends Model<ReturnInterface, ReturnCreationAttributes>, ReturnInterface {}