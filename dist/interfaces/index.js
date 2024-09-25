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
__exportStar(require("./community.interface"), exports);
__exportStar(require("./catogry.interface"), exports);
__exportStar(require("./charity.interface"), exports);
__exportStar(require("./donation.interface"), exports);
__exportStar(require("./patient.interface"), exports);
__exportStar(require("./admin.interface"), exports);
__exportStar(require("./pathology.interface"), exports);
__exportStar(require("./patientPathology.interface"), exports);
__exportStar(require("./medication.interface"), exports);
__exportStar(require("./medication_disposal.interface"), exports);
__exportStar(require("./medication_treatment.interface"), exports);
__exportStar(require("./treatment.interface"), exports);
__exportStar(require("./medication_expiration_date.interface"), exports);
__exportStar(require("./medication_donation.interface"), exports);
__exportStar(require("./delivery.interface"), exports);
__exportStar(require("./return.interface"), exports);
