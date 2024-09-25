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
exports.deleteCategory = exports.update = exports.create = exports.getAllActive = exports.getAll = void 0;
const sequelize_conf_1 = require("../config/sequelize.conf");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Category = yield sequelize_conf_1.CategoryDB.findAll();
        return {
            message: `Successful Category connection`,
            status: 200,
            data: {
                Category: Category,
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
        const Category = yield sequelize_conf_1.CategoryDB.findAll({
            where: { status: "active" }
        });
        return {
            message: `Successful Category connection`,
            status: 200,
            data: {
                Category: Category,
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
        const Category = yield sequelize_conf_1.CategoryDB.create(Object.assign({}, data));
        return {
            message: `Successful Category created`,
            status: 200,
            data: {
                Category: Category,
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
        const category = yield sequelize_conf_1.CategoryDB.findOne({
            where: { id }
        });
        if (!category) {
            return {
                message: `Category with id ${id} not found`,
                status: 404,
            };
        }
        const Category = yield sequelize_conf_1.CategoryDB.update(Object.assign({}, data), {
            where: { id }
        });
        const categoryUpdated = yield sequelize_conf_1.CategoryDB.findOne({ where: { id } });
        return {
            message: `Successful Community updted`,
            status: 200,
            data: {
                Community: categoryUpdated,
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
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Category = yield sequelize_conf_1.CategoryDB.update({ status: "deleted" }, { where: { id } });
        return {
            message: `Catery with id ${id} Successfully deleted`,
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
exports.deleteCategory = deleteCategory;
