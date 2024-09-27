"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const db_1 = require("./config/db");
const envs_1 = require("./config/envs");
const PORT = envs_1.envs.PORT;
const app = (0, express_1.default)();
//direcciones de registro de archivos
app.use(express_1.default.static('storage'));
//cors y json
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//router
app.use('/api', index_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
(0, db_1.initDb)();
