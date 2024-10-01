import { Request, Response } from 'express';
import {getAll, create, update, deleted, getAllActivities} from "../services/community.service";

export class CommunityController{
    
    async getAll(req: Request, res: Response){
        const { status, message, data } = await getAll();

        return res.status(status).json({
             message, data 
        });
    }

    async create(req: Request, res: Response){
        const { status, message, data } = await create(req.body);

        return res.status(status).json({
             message, data 
        });
    }

    async update(req: Request, res: Response){
        const {id}=req.params
    
        const { status, message, data } = await update(parseInt(id) as number, req.body);

        return res.status(status).json({
             message, data 
        });
    }

    async delete (req: Request, res: Response){
        const {id}=req.params
    
        const { status, message, } = await deleted(parseInt(id) as number);

        return res.status(status).json({
             message
        });
    }

    async getAllActivities(req: Request, res: Response){
        const { status, message, data } = await getAllActivities();

        return res.status(status).json({
             message,data
        });
    }
}