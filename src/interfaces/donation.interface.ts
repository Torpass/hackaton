import { Model, Optional } from "sequelize";

export interface DonationInterface {
    id?: number;
    description: string;
    category_id: number;
    charity_id: number;
    medications?:[
        {
            medication_id: number;
            quantity: number;
            expiration_date: Date
        }
    ]
    createdAt?: Date;
    updatedAt?: Date;
}

interface DonationCreationAttributes extends Optional<DonationInterface, "id"> {}

export interface DonationInstance extends Model<DonationInterface, DonationCreationAttributes>, DonationInterface {}
