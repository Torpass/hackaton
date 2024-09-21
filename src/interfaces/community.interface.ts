import { Model, Optional } from 'sequelize';

export interface CommunityInterface{
    id?:number;
    name:string;
    region:number;
    status: "activo" | "inactivo" | "deleted";
    created_at?:Date;
    updated_at?:Date;
}