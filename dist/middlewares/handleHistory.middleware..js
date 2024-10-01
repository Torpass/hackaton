"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3000';
const date = new Date();
const fullDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, path_1.default.join(__dirname, '../storage/history'));
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        const filename = `${req.body.id}-${fullDate}.${ext}`;
        const url = `${PUBLIC_URL}/history/${filename}`;
        req.body.images = req.body.images || [];
        req.body.images.push(url);
        cb(null, filename);
    }
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fieldSize: 1000000 },
    fileFilter(_req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    }
});
exports.default = upload;
