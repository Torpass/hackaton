import { Request, Response } from 'express';
import {getAll, create, getById} from "../services/delivery.service";

export class DeliveryController{
    
    async getAll(req: Request, res: Response){
        try{
            const { status, message, data } = await getAll();
            return res.status(status).json({
                message, data
            });
        }catch(err){
            return res.status(500).json({
                message: "Internal server error"
            });
        }
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


    
/*     async update(req: Request, res: Response){
        const {id}=req.params
    
        const { status, message, data } = await update(parseInt(id) as number, req.body);

        return res.status(status).json({
             message, data 
        });
    }

    async deleteTreatment(req: Request, res: Response){
        const {id}=req.params
    
        const { status, message } = await deleteTreatment(parseInt(id) as number);

        return res.status(status).json({
             message
        });
    } */
}