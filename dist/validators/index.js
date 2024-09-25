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
__exportStar(require("./community.validator"), exports);
__exportStar(require("./category.validator"), exports);
__exportStar(require("./charity.validator"), exports);
__exportStar(require("./donation.validator"), exports);
__exportStar(require("./patient.validator"), exports);
__exportStar(require("./admin.validator"), exports);
__exportStar(require("./treatment.validator"), exports);
__exportStar(require("./pathology.validator"), exports);
__exportStar(require("./Patient_Pathology.validator"), exports);
__exportStar(require("./medication.validator"), exports);
__exportStar(require("./delivery.validator"), exports);
__exportStar(require("./return.validator"), exports);
