"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const db_1 = require("./config/db");
const envs_1 = require("./config/envs");
const PORT = envs_1.envs.PORT;
const app = (0, express_1.default)();
//direcciones de registro de archivos
app.use('/history', express_1.default.static(path_1.default.join(__dirname, 'storage/history/')));
//cors y json
app.use((0, cors_1.default)({
    origin: '*', // Asegúrate de permitir los orígenes necesarios, o usa '*' para permitir todos
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express_1.default.json());
//router
app.use('/api', index_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
(0, db_1.initDb)();
