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
exports.DeliveryController = void 0;
const delivery_service_1 = require("../services/delivery.service");
class DeliveryController {
    getAll(req, res, statusData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message, data } = yield (0, delivery_service_1.getAll)(statusData);
                return res.status(status).json({
                    message, data
                });
            }
            catch (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, message, data } = yield (0, delivery_service_1.create)(req.body);
            return res.status(status).json({
                message, data
            });
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status, message, data } = yield (0, delivery_service_1.getById)(parseInt(id));
                return res.status(status).json({
                    message, data
                });
            }
            catch (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        });
    }
    changeStatus(req, res, statusData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const { status, message } = yield (0, delivery_service_1.changeStatus)(parseInt(id), statusData);
                return res.status(status).json({
                    message
                });
            }
            catch (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        });
    }
    communitiesMostDelivered(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message, data } = yield (0, delivery_service_1.communitiesMostDelivered)();
                return res.status(status).json({
                    message, data
                });
            }
            catch (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        });
    }
    deliveriesMedicationReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message, data } = yield (0, delivery_service_1.deliveriesMedicationReport)();
                return res.status(status).json({
                    message, data
                });
            }
            catch (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        });
    }
    getMostDeliveredPatients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message, data } = yield (0, delivery_service_1.getMostDeliveredPatients)();
                return res.status(status).json({
                    message, data
                });
            }
            catch (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        });
    }
    getMedicationByDelivery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status, message, data } = yield (0, delivery_service_1.getMedicationByDelivery)(parseInt(id));
                return res.status(status).json({
                    message, data
                });
            }
            catch (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        });
    }
}
exports.DeliveryController = DeliveryController;
// function getDeliveriesMedicationReport(): { status: any; message: any; data: any; } | PromiseLike<{ status: any; message: any; data: any; }> {
//     throw new Error('Function not implemented.');
// }
