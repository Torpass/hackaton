import { Request, Response } from 'express';
import { getAll, create, update, getById, getExpireSoon, getExpired, getUrgency, getMostDonatedMedicaments, getMostRequeriedByCommunity} from '../services/medication.service';
import {getMedicationsRequired} from "../services/medication_treatment.service"

export class MedicationController{
    
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

    async getExpireSoon(req: Request, res: Response){
        try{
            const { status, message, data } = await getExpireSoon();
            
            return res.status(status).json({
                message, data
            });
        }catch(err){
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    async getExpired(req: Request, res: Response){
        try{
            const { status, message, data } = await getExpired();
            
            return res.status(status).json({
                message, data
            });
        }catch(err){
            return res.status(500).json({
                message: "Internal server error"
            });
        }
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

    async getMostRequeried(req: Request, res: Response){
        try{
            const { status, message, data } = await getMedicationsRequired();
            
            return res.status(status).json({
                message, data
            });
        }catch(err){
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    async getUrgency(req: Request, res: Response){
        try{
            const { status, message, data } = await getUrgency();
            
            return res.status(status).json({
                message, data
            });
        }catch(err){
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    async getMostDonated(req: Request, res: Response){
        try{
            const { status, message, data } = await getMostDonatedMedicaments();
            
            return res.status(status).json({
                message, data
            });
        }catch(err){
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    async getMostRequeriedByCommunity(req: Request, res: Response){
        try{
            const { status, message, data } = await getMostRequeriedByCommunity();
            
            return res.status(status).json({
                message, data
            });
        }catch(err){
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    async delete(req: Request, res: Response){
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