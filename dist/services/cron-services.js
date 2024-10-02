"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronServices = void 0;
const sequelize_1 = require("sequelize");
const sequelize_conf_1 = require("../config/sequelize.conf");
class CronServices {
    updateEntregas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Buscar todas las entregas cuyo withdrawal_date haya pasado y cuyo estado no sea 'expired'
                const result = yield sequelize_conf_1.DeliveryDB.update({ status: 'vencido' }, {
                    where: {
                        expiration_date: {
                            [sequelize_1.Op.lt]: new Date(), // expiration_date es menor que la fecha actual
                        },
                        status: {
                            [sequelize_1.Op.ne]: 'vencido', // Aseguramos que no actualicemos entregas ya expiradas
                        }
                    }
                });
                console.log(`Se han actualizado ${result[0]} entregas a 'expired'.`);
            }
            catch (error) {
                console.error('Error actualizando las entregas expiradas:', error);
            }
        });
    }
}
exports.CronServices = CronServices;
