import { Model, Optional } from "sequelize";

export interface MedicationDonationInterface {
    id?: number;
    donation_id?: number;
    medication_id: number;
    quantity: number;
    expiration_date: Date;
}

interface MedicationDonationCreationAttributes extends Optional<MedicationDonationInterface, "id"> {}

export interface MedicationDonationInstance extends Model<MedicationDonationInterface, MedicationDonationCreationAttributes>, MedicationDonationInterface {}
