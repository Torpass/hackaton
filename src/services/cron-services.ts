import { Op, Sequelize } from "sequelize";
import { DeliveryDB } from "../config/sequelize.conf";

export class CronServices {
  async updateEntregas() {
    try {
        // Buscar todas las entregas cuyo withdrawal_date haya pasado y cuyo estado no sea 'expired'
        const result = await DeliveryDB.update(
          { status: 'vencido' }, 
          {
            where: {
              expiration_date: {
                [Op.lt]: new Date(), // expiration_date es menor que la fecha actual
              },
              status: {
                [Op.ne]: 'vencido', // Aseguramos que no actualicemos entregas ya expiradas
              }
            }
          }
        );
    
        console.log(`Se han actualizado ${result[0]} entregas a 'expired'.`);
      } catch (error) {
        console.error('Error actualizando las entregas expiradas:', error);
      }
    }
}