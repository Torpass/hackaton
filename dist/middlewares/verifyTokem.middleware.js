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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_conf_1 = require("../config/sequelize.conf");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.JWT_SECRET || '';
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'private route, token required' });
    }
    const [bearer, token] = authorizationHeader.split(' ');
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const { cedula } = decoded;
        const user = yield sequelize_conf_1.AdminDB.findOne({ where: { cedula: cedula } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        next();
    }
    catch (error) {
        console.error(`Error verifying token: ${error}`);
        return res.status(401).json({ message: 'Error verifying token' });
    }
});
exports.verifyToken = verifyToken;
