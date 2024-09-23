import { Model, Optional } from "sequelize";

export interface MedicationExpirationDate {
    id?: number;
    medication_id: number;
    expiration_date: Date;
    quantity: number;
}

interface MedicationExpirationCreationAttributes extends Optional<MedicationExpirationDate, "id"> {}

export interface MedicationExpirationInstance extends Model<MedicationExpirationDate, MedicationExpirationCreationAttributes>, MedicationExpirationDate {}