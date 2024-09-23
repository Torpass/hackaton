export interface TreatmentInterface {
    id?: number;
    patient_id: number;
    observation: string;
    status: "not supplied" | "partially supplied" | "supplied";
    createdAt?: Date;
    updatedAt?: Date;
}