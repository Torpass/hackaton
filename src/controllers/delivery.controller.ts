import { Request, Response } from 'express';
import {getAll, create, getById, changeStatus, communitiesMostDelivered, deliveriesMedicationReport} from "../services/delivery.service";

export class DeliveryController{    
    async getAll(req: Request, res: Response, statusData: "entregado" | "pendiente" | "vencido" | "eliminado") {
        try {
          const { status, message, data } = await getAll(statusData);
          return res.status(status).json({
            message, data
          });
        } catch (err) {
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

    async changeStatus(req: Request, res: Response, statusData: "entregado" | "pendiente" | "vencido" | "eliminado") {
        const { id } = req.params;
        try {
        const { status, message } = await changeStatus(parseInt(id) as number, statusData);
        return res.status(status).json({
            message
        });
        } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
        }
    }

    async communitiesMostDelivered(req: Request, res: Response){
        try{
            const { status, message, data } = await communitiesMostDelivered();
            return res.status(status).json({
                message, data
            });
        }catch(err){
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    async deliveriesMedicationReport(req: Request, res: Response){ 
        try {
          const { status, message, data } = await deliveriesMedicationReport();
          return res.status(status).json({
            message, data
          });
        } catch (err) {
          return res.status(500).json({
            message: "Internal server error"
          });
        }
    }
    

    /*  async update(req: Request, res: Response){
        const {id}=req.params

        const { status, message, data } = await update(parseInt(id) as number, req.body);

        return res.status(status).json({
                message, data 
        });
    }
*/
}

function getDeliveriesMedicationReport(): { status: any; message: any; data: any; } | PromiseLike<{ status: any; message: any; data: any; }> {
    throw new Error('Function not implemented.');
}
