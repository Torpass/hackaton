"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exiredDeliveries = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const cron_services_1 = require("../services/cron-services");
// Programa la tarea para que se ejecute todos los días a la medianoche
const crontask = new cron_services_1.CronServices();
const exiredDeliveries = () => {
    node_cron_1.default.schedule('0 0 * * *', () => {
        console.log('Ejecutando la tarea diaria para actualizar entregas expiradas...');
        crontask.updateEntregas();
    }, {
        timezone: "America/Los_Angeles"
    });
};
exports.exiredDeliveries = exiredDeliveries;
