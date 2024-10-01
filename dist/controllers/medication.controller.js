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
exports.MedicationController = void 0;
const medication_service_1 = require("../services/medication.service");
const medication_treatment_service_1 = require("../services/medication_treatment.service");
class MedicationController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, message, data } = yield (0, medication_service_1.getAll)();
            return res.status(status).json({
                message, data
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, message, data } = yield (0, medication_service_1.create)(req.body);
            return res.status(status).json({
                message, data
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status, message, data } = yield (0, medication_service_1.update)(parseInt(id), req.body);
            return res.status(status).json({
                message, data
            });
        });
    }
    getExpireSoon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message, data } = yield (0, medication_service_1.getExpireSoon)();
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
    getExpired(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message, data } = yield (0, medication_service_1.getExpired)();
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
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status, message, data } = yield (0, medication_service_1.getById)(parseInt(id));
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
    getMostRequeried(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message, data } = yield (0, medication_treatment_service_1.getMedicationsRequired)();
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
    getUrgency(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message, data } = yield (0, medication_service_1.getUrgency)();
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
    getMostDonated(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message, data } = yield (0, medication_service_1.getMostDonatedMedicaments)();
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
    getMostRequeriedByCommunity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message, data } = yield (0, medication_service_1.getMostRequeriedByCommunity)();
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
exports.MedicationController = MedicationController;
