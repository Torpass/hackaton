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
exports.initDb = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const envs_1 = require("./envs");
const sequelize = new sequelize_1.Sequelize({
    dialect: "postgres",
    database: envs_1.envs.POSTGRES_DB,
    username: envs_1.envs.POSTGRES_USER,
    password: envs_1.envs.POSTGRES_PASSWORD,
    host: envs_1.envs.POSTGRES_HOST,
    port: envs_1.envs.POSTGRES_PORT
});
exports.sequelize = sequelize;
//iniciar db
const initDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Postgres conectado');
    }
    catch (e) {
        console.log(e);
        throw new Error('no papa no me pude conectar');
    }
});
exports.initDb = initDb;
