import 'dotenv/config';
import {exiredDeliveries} from "./utils/handle-cron"
import path from 'path';
import express from "express";
import cors from "cors";
import router from './routes/index'
import {initDb} from './config/db'
import { envs } from './config/envs';

const PORT = envs.PORT;
const app = express();

//direcciones de registro de archivos
app.use('/history', express.static(path.join(__dirname, 'storage/history/')));

//cors y json
app.use(cors({
    origin: '*', // Asegúrate de permitir los orígenes necesarios, o usa '*' para permitir todos
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));
app.use(express.json());

//router
app.use('/api', router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

initDb();

exiredDeliveries();