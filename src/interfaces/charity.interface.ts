export interface CharityInterface {
    id?: number;
    name: string;
    description: string;
    status: "active" | "inactive" | "deleted";
    createdAt?: Date;
    updatedAt?: Date;
}
