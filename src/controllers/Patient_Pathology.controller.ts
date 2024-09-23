import { Request, Response } from 'express';
import {getAllPAtienPathology, CreatePathologyPatient, Delete, getPAtienPathologyByID} from "../services/Patient_Pathology.service";

export class Patient_Pathology_Controller{
    
    
    async getbyid(req: Request, res: Response){
        try{
            const {id}=req.params
            const { status, message, data } = await getPAtienPathologyByID(parseInt(id) as number);
            return res.status(status).json({
                message, data
            });
        }catch(err){
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }
    async getall(req: Request, res: Response){
        try{
            const { status, message, data } = await getAllPAtienPathology();
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
        const { status, message, data } = await CreatePathologyPatient(req.body);

        return res.status(status).json({
             message, data 
        });
    }
    async Delete(req: Request, res: Response){
        try{

            const {patient_id,pathology_id}=req.params
            const { status, message, data } = await Delete(parseInt(patient_id) as number,parseInt(pathology_id) as number);
            
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