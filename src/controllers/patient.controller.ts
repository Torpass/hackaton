import { Request, Response } from 'express';
import { getAll, create, update, deletePatient, getAllActive, getById, getFullPatient,getPriorityPatients, getRangePatients, getPatientsByCommunity  } from '../services/patient.service';

export class PatientController{
    
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

    async deletePatient(req: Request, res: Response){
        const {id}=req.params
    
        const { status, message} = await deletePatient(parseInt(id) as number);

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

    async getFullPatient(req: Request, res: Response){
        try{
            const {id}=req.params
            const { status, message, data } = await getFullPatient(parseInt(id) as number);
            
            return res.status(status).json({
                message, data
            });
        }catch(err){
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    async getFilteredPatients(req: Request, res: Response){
        try{
            const { status, message, data } = await getRangePatients(req.body);
            
            return res.status(status).json({
                message, data
            });
        }catch(err){
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }


    async getPatientsByCommunity(req: Request, res: Response){
        try{
            const { status, message, data } = await getPatientsByCommunity();
            
            return res.status(status).json({
                message, data
            });
        }catch(err){
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    async getPriorityPatients(req: Request, res: Response){
        const { status, message, data } = await getPriorityPatients();

        return res.status(status).json({
             message, data 
        });
    }
}