import { Request, Response } from 'express';
import { getAll, create, getById } from '../services/return.service';

export class ReturnController{
    
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

    async getById(req: Request, res: Response){
        try{
            
            const {id}=req.params
            const { status, message, data } = await getById(parseInt(id) as number);
            
            return res.status(status).json({
                message, data
            });
        }catch(err){
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }
}