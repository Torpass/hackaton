import { Model, Optional } from "sequelize";

export interface DeliveryInterface {
    id?: number;
    patient_id: number;
    treatment_id: number;
    appointment_date: Date;
    withdrawal_date: Date;
    expiration_date: Date;
    status: "entregado" | "pendiente" | "vencido" | "eliminado";
    medications?:[
        {
            medication_id:number;
            quantity:number
        }
    ]
    createdAt?: Date;
    updatedAt?: Date;
}

interface DeliveryCreationAttributes extends Optional<DeliveryInterface, "id"> {}

export interface DeliveryInstance extends Model<DeliveryInterface, DeliveryCreationAttributes>, DeliveryInterface {}