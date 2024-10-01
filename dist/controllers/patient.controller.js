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
exports.PatientController = void 0;
const patient_service_1 = require("../services/patient.service");
class PatientController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, message, data } = yield (0, patient_service_1.getAll)();
            return res.status(status).json({
                message, data
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, message, data } = yield (0, patient_service_1.create)(req.body);
            return res.status(status).json({
                message, data
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status, message, data } = yield (0, patient_service_1.update)(parseInt(id), req.body);
            return res.status(status).json({
                message, data
            });
        });
    }
    deletePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status, message } = yield (0, patient_service_1.deletePatient)(parseInt(id));
            return res.status(status).json({
                message
            });
        });
    }
    getAllActive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, message, data } = yield (0, patient_service_1.getAllActive)();
            return res.status(status).json({
                message, data
            });
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status, message, data } = yield (0, patient_service_1.getById)(parseInt(id));
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
    getFullPatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status, message, data } = yield (0, patient_service_1.getFullPatient)(parseInt(id));
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
    getFilteredPatients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message, data } = yield (0, patient_service_1.getRangePatients)(req.body);
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
    getPatientsByCommunity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message, data } = yield (0, patient_service_1.getPatientsByCommunity)();
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
    getPriorityPatients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, message, data } = yield (0, patient_service_1.getPriorityPatients)();
            return res.status(status).json({
                message, data
            });
        });
    }
}
exports.PatientController = PatientController;
