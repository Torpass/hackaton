import { Request, Response } from 'express';
import {getAll, create, update, deleteCategory, getAllActive} from "../services/category.service";

export class CategoryController{
    
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

    async deleteCategory(req: Request, res: Response){
        const {id}=req.params
    
        const { status, message} = await deleteCategory(parseInt(id) as number);

        return res.status(status).json({
             message
        });
    }

    async getAllActive(req: Request, res: Response){
        const { status, message, data } = await getAllActive();

        return res.status(status).json({
             message, data 
        });
    }

}