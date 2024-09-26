import { Model, Optional } from "sequelize";

export interface MedicationInterface {
    id?: number;
    name: string;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}


interface MedicationCreationAttributes extends Optional<MedicationInterface, "id"> {}

export interface MedicationInstance extends Model<MedicationInterface, MedicationCreationAttributes>, MedicationInterface {}