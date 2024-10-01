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
exports.login = exports.deleteUser = exports.update = exports.create = exports.getAllActive = exports.getAll = void 0;
const sequelize_conf_1 = require("../config/sequelize.conf");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const indentification_1 = require("../utils/indentification");
const TOKEN_EXPIRATION = "1h";
const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno");
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
    const t = yield db_1.sequelize.transaction();
    try {
        const indentifactionInfo = (0, indentification_1.splitIdentification)(data.cedula);
        const userEmail = yield sequelize_conf_1.AdminDB.findOne({
            where: { email: data.email },
            transaction: t,
        });
        if (userEmail) {
            return {
                message: `User with cedula ${data.email} already exists`,
                status: 400,
            };
        }
        const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
        const userData = Object.assign(Object.assign({}, data), { cedula: indentifactionInfo.identification, password: hashedPassword });
        const User = yield sequelize_conf_1.AdminDB.create(userData, { transaction: t });
        if (data.userType === 'donor') {
            const lastCharity = yield sequelize_conf_1.CharityDB.findOne({
                order: [["id", "DESC"]],
                transaction: t
            });
            const lastCharityId = lastCharity === null || lastCharity === void 0 ? void 0 : lastCharity.get("id");
            const charityId = lastCharityId + 1;
            const charity = yield sequelize_conf_1.CharityDB.create({
                id: charityId,
                razon_social: data.razon_social,
                description: data.description,
                status: "active",
                is_fundation: data.is_fundation,
                identification: indentifactionInfo.identification,
                indentification_type: indentifactionInfo.identification_type,
            }, { transaction: t });
            yield t.commit();
            return {
                message: `Successful User created`,
                status: 200,
                data: {
                    User: User,
                    charity: charity
                },
            };
        }
        yield t.commit();
        return {
            message: `Successful User created`,
            status: 200,
            data: {
                User: User,
            },
        };
    }
    catch (error) {
        console.log(error);
        yield t.rollback();
        return {
            message: `Contact the administrator: error`,
            status: 500,
        };
    }
});
exports.create = create;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield sequelize_conf_1.AdminDB.findOne({
            where: { id },
        });
        if (!user) {
            return {
                message: `User with id ${id} not found`,
                status: 404,
            };
        }
        const User = yield sequelize_conf_1.AdminDB.update(Object.assign({}, data), {
            where: { id },
        });
        const UserUpdated = yield sequelize_conf_1.AdminDB.findOne({ where: { id } });
        return {
            message: `Successful User updted`,
            status: 200,
            data: {
                User: UserUpdated,
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
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield sequelize_conf_1.AdminDB.update({ status: "deleted" }, { where: { id } });
        return {
            message: `User with id ${id} Successfully deleted`,
            status: 200,
        };
    }
    catch (error) {
        return {
            message: `User the administrator: error`,
            status: 500,
        };
    }
});
exports.deleteUser = deleteUser;
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userActive = yield sequelize_conf_1.AdminDB.findOne({
            where: {
                email: data.email,
                status: "active",
            },
        });
        if (!userActive) {
            return {
                message: "Usuario no registrado",
                status: 400,
            };
        }
        const password = userActive.get("password");
        const isValid = yield bcryptjs_1.default.compare(data.password, password);
        if (!isValid) {
            return {
                message: "Clave incorrecta",
                status: 400,
            };
        }
        const token = jsonwebtoken_1.default.sign({
            id: userActive.id,
            name: `${userActive.first_name} ${userActive.last_name}`,
            userType: userActive.userType,
            email: data.email,
        }, SECRET_KEY, {
            expiresIn: TOKEN_EXPIRATION,
        });
        return {
            message: `Successful Admin login`,
            status: 200,
            data: {
                Admin: userActive,
                token,
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
