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
exports.deleteMedication = exports.getMostRequeriedByCommunity = exports.getMostDonatedMedicaments = exports.getUrgency = exports.getExpired = exports.getExpireSoon = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const sequelize_conf_1 = require("../config/sequelize.conf");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Medication = yield sequelize_conf_1.MedicationDB.findAll({});
        return {
            message: `Successful Medication connection`,
            status: 200,
            data: {
                Medication: Medication,
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
        const Medication = yield sequelize_conf_1.MedicationDB.findOne({
            where: { id },
        });
        if (!Medication) {
            return {
                message: `Medication with id ${id} not found`,
                status: 404,
            };
        }
        return {
            message: `Successful Medication connection`,
            status: 200,
            data: {
                Medication: Medication,
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
        const lastMedication = yield sequelize_conf_1.MedicationDB.findOne({
            order: [['id', 'DESC']],
        });
        const newId = lastMedication ? lastMedication.id + 1 : 1;
        const Medication = yield sequelize_conf_1.MedicationDB.create(Object.assign({ id: newId }, data));
        return {
            message: `Successful Medication created`,
            status: 200,
            data: {
                Medication: Medication,
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
        const Medication = yield sequelize_conf_1.MedicationDB.findOne({
            where: { id }
        });
        if (!Medication) {
            return {
                message: `Medication with id ${id} not found`,
                status: 404,
            };
        }
        const MedicationUpdted = yield sequelize_conf_1.MedicationDB.update(Object.assign({}, data), {
            where: { id }
        });
        const MedicationUpdated = yield sequelize_conf_1.MedicationDB.findOne({ where: { id } });
        return {
            message: `Successful Community updted`,
            status: 200,
            data: {
                Community: MedicationUpdated,
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
const getExpireSoon = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicationsExpiringSoon = yield sequelize_conf_1.sequelize.query(`
      SELECT 
        m.id AS medication_id,
        m.name AS medication_name,
        md.quantity,
        md.expiration_date
      FROM 
        medication_donations AS md
      INNER JOIN 
        medications AS m ON m.id = md.medication_id
      ORDER BY 
        md.expiration_date ASC
    `);
        const today = new Date();
        const soon = new Date(today);
        soon.setDate(today.getDate() + 30); // Medicamentos que vencen en 30 días
        const filteredMedications = medicationsExpiringSoon[0].filter((medication) => {
            const expirationDate = new Date(medication.expiration_date);
            return expirationDate > today;
        });
        return {
            message: `Successful Medication connection`,
            status: 200,
            data: {
                Medication: filteredMedications,
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
exports.getExpireSoon = getExpireSoon;
const getExpired = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicationsExpiringSoon = yield sequelize_conf_1.sequelize.query(`
      SELECT 
        m.id AS medication_id,
        m.name AS medication_name,
        md.quantity,
        md.expiration_date
      FROM 
        medication_donations AS md
      INNER JOIN 
        medications AS m ON m.id = md.medication_id
      ORDER BY 
        md.expiration_date ASC
    `);
        const today = new Date();
        const soon = new Date(today);
        soon.setDate(today.getDate() + 30); // Medicamentos que vencen en 30 días
        const filteredMedications = medicationsExpiringSoon[0].filter((medication) => {
            const expirationDate = new Date(medication.expiration_date);
            return expirationDate < today;
        });
        return {
            message: `Successful Medication connection`,
            status: 200,
            data: {
                Medication: filteredMedications,
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
exports.getExpired = getExpired;
const getUrgency = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicationsRequired = yield sequelize_conf_1.sequelize.query(`
       SELECT 
        m.id AS medication_id,
        m.name AS medication_name,
        COALESCE(SUM(mt.quantity), 0) AS total_required,  -- Total requerido en tratamientos
        m.quantity AS inventory_available,  -- Cantidad disponible en inventario
        (COALESCE(SUM(mt.quantity), 0) - m.quantity) AS shortage  -- Diferencia entre requerido y disponible
      FROM 
        medications AS m
      LEFT JOIN 
        medication_treatments AS mt ON m.id = mt.medication_id  -- Unimos las medicinas con los tratamientos
      GROUP BY 
        m.id  -- Agrupamos por medicamento
      HAVING 
        (COALESCE(SUM(mt.quantity), 0) - m.quantity) > 0  -- Solo mostrar medicamentos con escasez
      ORDER BY 
        shortage DESC  -- Ordenamos de mayor a menor escasez
    `);
        return {
            message: `Successful Medication connection`,
            status: 200,
            data: {
                Medication: medicationsRequired[0],
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
exports.getUrgency = getUrgency;
const getMostDonatedMedicaments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicationsRequired = yield sequelize_conf_1.sequelize.query(`
    SELECT 
      md.medication_id,
      m.name AS medication_name,
      COUNT(md.medication_id) AS donation_count,  
      SUM(md.quantity) AS total_donated
    FROM 
      medication_donations AS md
      INNER JOIN medications AS m ON m.id = md.medication_id  
    GROUP BY 
      md.medication_id, m.name  
    ORDER BY 
      total_donated DESC  
    `);
        return {
            message: `Successful Medication connection`,
            status: 200,
            data: {
                Medication: medicationsRequired[0],
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
exports.getMostDonatedMedicaments = getMostDonatedMedicaments;
const getMostRequeriedByCommunity = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicationsRequired = yield sequelize_conf_1.sequelize.query(`
    SELECT 
  t.community_name,
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'medication_name', t.medication_name,
      'total_medicamentos_necesitados', t.total_medicamentos_necesitados
    )
  ) AS medications
FROM 
  (
    SELECT 
      c.name AS community_name,
      m.name AS medication_name,
      SUM(mt.quantity) AS total_medicamentos_necesitados
    FROM 
      medications AS m
      INNER JOIN medication_treatments AS mt ON m.id = mt.medication_id
      INNER JOIN treatments AS t ON mt.treatment_id = t.id
      INNER JOIN patients AS p ON t.patient_id = p.id
      INNER JOIN communities AS c ON p.community_id = c.id
    GROUP BY 
      c.name, m.name
  ) AS t
GROUP BY 
  t.community_name
ORDER BY 
  t.community_name;
    `);
        return {
            message: `Successful Medication connection`,
            status: 200,
            data: {
                Medication: medicationsRequired[0],
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
exports.getMostRequeriedByCommunity = getMostRequeriedByCommunity;
const deleteMedication = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Medication = yield sequelize_conf_1.MedicationDB.findOne({
            where: { id }
        });
        if (!Medication) {
            return {
                message: `Medication with id ${id} not found`,
                status: 404,
            };
        }
        yield sequelize_conf_1.MedicationDB.destroy({
            where: { id }
        });
        return {
            message: `Successful Medication deleted`,
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
exports.deleteMedication = deleteMedication;
