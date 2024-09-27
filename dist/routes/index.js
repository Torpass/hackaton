"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
const PATH_ROUTES = __dirname;
const removeExtension = (fileName) => {
    return fileName.split('.').shift();
};
fs_1.default.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file);
    if (name !== 'index') {
        console.log(`ruta actual: ${name}`);
        router.use(`/${name}`, require(`./${file}`));
    }
});
exports.default = router;
