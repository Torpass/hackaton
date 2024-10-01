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
            name?:string;
            medication_id:number;
            quantity:number,
            delivery_details?:{
                quantity:number
            }
        }
    ]
    patient?:{
        id:number;
        name:string;
        lastname:string;
        id_card:string;
        email:string;
        gender:string;
        economic_status:string;
        vulnerability_level:string;
        phone:string;
        address:string;
    }
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