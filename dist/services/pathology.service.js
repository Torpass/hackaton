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
exports.update = exports.create = exports.getById = exports.getAll = void 0;
const sequelize_conf_1 = require("../config/sequelize.conf");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pathologies = yield sequelize_conf_1.PathologyDB.findAll();
        return {
            message: `Successful Pathology connection`,
            status: 200,
            data: {
                pathologies: pathologies,
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
exports.getAll = getAll;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Pathology = yield sequelize_conf_1.PathologyDB.findOne({
            where: { id },
        });
        if (!Pathology) {
            return {
                message: `Pathology with id ${id} not found`,
                status: 404,
            };
        }
        return {
            message: `Successful Pathology connection`,
            status: 200,
            data: {
                Donation: Pathology,
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
exports.getById = getById;
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Pathology = yield sequelize_conf_1.PathologyDB.create(Object.assign({}, data));
        return {
            message: `Successful Pathology created`,
            status: 200,
            data: {
                Pathology: Pathology,
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
exports.create = create;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Pathology = yield sequelize_conf_1.PathologyDB.findOne({
            where: { id }
        });
        if (!Pathology) {
            return {
                message: `Pathology with id ${id} not found`,
                status: 404,
            };
        }
        const PathologyUpdted = yield sequelize_conf_1.PathologyDB.update(Object.assign({}, data), {
            where: { id }
        });
        const PathologyUpdated = yield sequelize_conf_1.PathologyDB.findOne({ where: { id } });
        return {
            message: `Successful Pathology updted`,
            status: 200,
            data: {
                Community: PathologyUpdated,
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
