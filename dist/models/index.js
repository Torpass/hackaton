"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./community.model"), exports);
__exportStar(require("./category.model"), exports);
__exportStar(require("./charity.model"), exports);
__exportStar(require("./donation.model"), exports);
__exportStar(require("./patient.model"), exports);
__exportStar(require("./pathology.model"), exports);
__exportStar(require("./pathology_patient.model"), exports);
__exportStar(require("./treatment.model"), exports);
__exportStar(require("./medication.model"), exports);
__exportStar(require("./medication_treatment.model"), exports);
__exportStar(require("./medication_pathology.model"), exports);
__exportStar(require("./medication_expiration_date.model"), exports);
__exportStar(require("./medication_disposal.model"), exports);
__exportStar(require("./medication_donation.model"), exports);
__exportStar(require("./delivery.model"), exports);
__exportStar(require("./delivery_details.model"), exports);
__exportStar(require("./return.model"), exports);
__exportStar(require("./return_details.model"), exports);
__exportStar(require("./patient.model"), exports);
__exportStar(require("./admin.model"), exports);
