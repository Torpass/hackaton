import { Model, Optional } from "sequelize";

export interface DeliveryInterface {
    id?: number;
    patient_id: number;
    treatment_id: number;
    appointment_date: Date;
    withdrawal_date: Date | null;
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

export interface DeliveryMedication {
    id: number; // Este es el ID del medicamento
    name: string; // Nombre del medicamento
    delivery_details: {
      quantity: number; // Cantidad solicitada en la entrega
    };
  }

interface DeliveryCreationAttributes extends Optional<DeliveryInterface, "id"> {}

export interface DeliveryInstance extends Model<DeliveryInterface, DeliveryCreationAttributes>, DeliveryInterface {}