import { Request, Response } from 'express';
import {getAll} from "../services/community.service";

export class CommunityController{
    
    async hello(req: Request, res: Response){
        console.log(req)
        const { status, message, data } = await getAll();

        console.log(status, message, data)
        return res.status(status).json({
             message, data 
        });
    }


    
}