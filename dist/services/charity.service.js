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
exports.deleteCharity = exports.update = exports.create = exports.getFullCharity = exports.getAllActive = exports.getAll = void 0;
const sequelize_conf_1 = require("../config/sequelize.conf");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Charity = yield sequelize_conf_1.CharityDB.findAll();
        return {
            message: `Successful Charity connection`,
            status: 200,
            data: {
                Charity: Charity,
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
        const Charity = yield sequelize_conf_1.CharityDB.findAll({
            where: { status: "active" }
        });
        return {
            message: `Successful Charity connection`,
            status: 200,
            data: {
                Charity: Charity,
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
const getFullCharity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const charityWithDonations = yield sequelize_conf_1.CharityDB.findOne({
            where: { id },
            attributes: ['id', 'razon_social', 'identification', 'indentification_type', 'is_fundation'],
            include: [
                {
                    model: sequelize_conf_1.DonationDB,
                    attributes: ['id', 'description'],
                    include: [
                        {
                            model: sequelize_conf_1.MedicationDB,
                            through: { attributes: ['quantity', 'expiration_date'] }, // Tabla intermedia
                            attributes: ['id', 'name'], // Atributos del medicamento
                        }
                    ]
                }
            ]
        });
        return {
            message: `Successful Charity connection`,
            status: 200,
            data: {
                Charity: charityWithDonations,
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
exports.getFullCharity = getFullCharity;
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Charity = yield sequelize_conf_1.CharityDB.create(Object.assign({}, data));
        return {
            message: `Successful Charity created`,
            status: 200,
            data: {
                Charity: Charity,
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
        const Charity = yield sequelize_conf_1.CharityDB.findOne({
            where: { id }
        });
        if (!Charity) {
            return {
                message: `Charity with id ${id} not found`,
                status: 404,
            };
        }
        const charityUpdted = yield sequelize_conf_1.CharityDB.update(Object.assign({}, data), {
            where: { id }
        });
        const CharityUpdated = yield sequelize_conf_1.CharityDB.findOne({ where: { id } });
        return {
            message: `Successful Community updted`,
            status: 200,
            data: {
                Community: CharityUpdated,
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
const deleteCharity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Charity = yield sequelize_conf_1.CharityDB.update({ status: "deleted" }, { where: { id } });
        return {
            message: `Charity with id ${id} Successfully deleted`,
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
exports.deleteCharity = deleteCharity;
