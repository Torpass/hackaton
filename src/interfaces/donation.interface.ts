export interface DonationInterface {
    id?: number;
    name: string;
    description: string;
    status: "procesado" | "pendiente" | "cancelado";
    category_id: number;
    charity_id: number;
    createdAt?: Date;
    updatedAt?: Date;
}
