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
exports.login = exports.deleteAdmin = exports.update = exports.create = exports.getAllActive = exports.getAll = void 0;
const sequelize_conf_1 = require("../config/sequelize.conf");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TOKEN_EXPIRATION = '1h';
const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno');
}
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Admin = yield sequelize_conf_1.AdminDB.findAll({});
        return {
            message: `Successful Admin connection`,
            status: 200,
            data: {
                Admin: Admin,
            },
        };
    }
    catch (error) {
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.getAll = getAll;
const getAllActive = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Admin = yield sequelize_conf_1.AdminDB.findAll({
            where: { status: "active" },
        });
        return {
            message: `Successful Admin connection`,
            status: 200,
            data: {
                Admin: Admin,
            },
        };
    }
    catch (error) {
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.getAllActive = getAllActive;
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminCedula = yield sequelize_conf_1.AdminDB.findOne({
            where: { cedula: data.cedula }
        });
        if (adminCedula) {
            return {
                message: `Admin with cedula ${data.cedula} already exists`,
                status: 400,
            };
        }
        const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
        const adminData = Object.assign(Object.assign({}, data), { password: hashedPassword });
        const Admin = yield sequelize_conf_1.AdminDB.create(adminData);
        return {
            message: `Successful Admin created`,
            status: 200,
            data: {
                Admin: Admin,
            },
        };
    }
    catch (error) {
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.create = create;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield sequelize_conf_1.AdminDB.findOne({
            where: { id }
        });
        if (!admin) {
            return {
                message: `Admin with id ${id} not found`,
                status: 404,
            };
        }
        const Admin = yield sequelize_conf_1.AdminDB.update(Object.assign({}, data), {
            where: { id }
        });
        const AdminUpdated = yield sequelize_conf_1.AdminDB.findOne({ where: { id } });
        return {
            message: `Successful Admin updted`,
            status: 200,
            data: {
                Admin: AdminUpdated,
            },
        };
    }
    catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.update = update;
const deleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Admin = yield sequelize_conf_1.AdminDB.update({ status: "deleted" }, { where: { id } });
        return {
            message: `Admin with id ${id} Successfully deleted`,
            status: 200,
        };
    }
    catch (error) {
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.deleteAdmin = deleteAdmin;
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminActive = yield sequelize_conf_1.AdminDB.findOne({
            where: {
                cedula: data.cedula,
                status: 'active'
            }
        });
        if (!adminActive) {
            return {
                message: 'Usuario no registrado',
                status: 400,
            };
        }
        const password = adminActive.get('password');
        const isValid = yield bcryptjs_1.default.compare(data.password, password);
        if (!isValid) {
            return {
                message: 'Clave incorrecta',
                status: 400,
            };
        }
        const token = jsonwebtoken_1.default.sign({
            id: data.id,
            cedula: data.cedula,
        }, SECRET_KEY, {
            expiresIn: TOKEN_EXPIRATION
        });
        return {
            message: `Successful Admin login`,
            status: 200,
            data: {
                Admin: adminActive,
                token
            },
        };
    }
    catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.login = login;
