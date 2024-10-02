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
exports.getAllActivities = exports.deleted = exports.update = exports.create = exports.getAll = void 0;
const sequelize_conf_1 = require("../config/sequelize.conf");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Communities = yield sequelize_conf_1.CommunityDB.findAll();
        return {
            message: `Successful Community connection`,
            status: 200,
            data: {
                Community: Communities,
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
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lastCommunity = yield sequelize_conf_1.CommunityDB.findOne({
            order: [['id', 'DESC']]
        });
        const newCommunityId = lastCommunity ? lastCommunity.id + 1 : 1;
        const Community = yield sequelize_conf_1.CommunityDB.create(Object.assign({ id: newCommunityId }, data));
        return {
            message: `Successful Community created`,
            status: 200,
            data: {
                Community: Community,
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
        const community = yield sequelize_conf_1.CommunityDB.findOne({
            where: { id }
        });
        if (!community) {
            return {
                message: `Community with id ${id} not found`,
                status: 404,
            };
        }
        const Community = yield sequelize_conf_1.CommunityDB.update(Object.assign({}, data), {
            where: { id }
        });
        const communityUpdated = yield sequelize_conf_1.CommunityDB.findOne({ where: { id } });
        return {
            message: `Successful Community updted`,
            status: 200,
            data: {
                Community: communityUpdated,
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
const deleted = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const community = yield sequelize_conf_1.CommunityDB.findOne({
            where: { id }
        });
        if (!community) {
            return {
                message: `Community with id ${id} not found`,
                status: 404,
            };
        }
        yield sequelize_conf_1.CommunityDB.update({ status: "deleted" }, { where: { id } });
        return {
            message: `Successful Community with id ${id} deleted`,
            status: 200,
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
exports.deleted = deleted;
const getAllActivities = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('wish you were here');
        const Communities = yield sequelize_conf_1.CommunityDB.findAll({
            where: { status: "active" }
        });
        return {
            message: `Successful Community connection`,
            status: 200,
            data: {
                Community: Communities,
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
exports.getAllActivities = getAllActivities;
