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
exports.AdminController = void 0;
const admin_service_1 = require("../services/admin.service");
class AdminController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, message, data } = yield (0, admin_service_1.getAll)();
            return res.status(status).json({
                message, data
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, message, data } = yield (0, admin_service_1.create)(req.body);
            return res.status(status).json({
                message, data
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, message, data } = yield (0, admin_service_1.login)(req.body);
            if (status === 200 && (data === null || data === void 0 ? void 0 : data.token)) {
                res.cookie('access_token', data.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'development',
                    sameSite: 'strict',
                    maxAge: 1000 * 60 * 60,
                });
            }
            return res.status(status).json({
                message, data
            });
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res
                .clearCookie('access_token')
                .status(200)
                .json({ message: 'Logout Successful' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status, message, data } = yield (0, admin_service_1.update)(parseInt(id), req.body);
            return res.status(status).json({
                message, data
            });
        });
    }
    deleteAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status, message } = yield (0, admin_service_1.deleteAdmin)(parseInt(id));
            return res.status(status).json({
                message
            });
        });
    }
    getAllActive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, message, data } = yield (0, admin_service_1.getAllActive)();
            return res.status(status).json({
                message, data
            });
        });
    }
}
exports.AdminController = AdminController;
