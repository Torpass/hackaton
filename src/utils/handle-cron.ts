import cron from 'node-cron'; 
import { CronServices } from '../services/cron-services'  

// Programa la tarea para que se ejecute todos los días a la medianoche

const crontask = new CronServices();

export const exiredDeliveries = () => {
    cron.schedule('0 0 * * *', () => {
        console.log('Ejecutando la tarea diaria para actualizar entregas expiradas...');
        crontask.updateEntregas();
      }, {
        timezone: "America/Los_Angeles"
      });
}

