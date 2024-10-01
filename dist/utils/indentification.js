"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitIdentification = splitIdentification;
function splitIdentification(identificationString) {
    const regex = /^([A-Z])-([0-9]+)$/;
    const match = identificationString.match(regex);
    if (!match) {
        throw new Error('El formato de identificación no es válido');
    }
    return {
        identification_type: match[1],
        identification: match[2],
    };
}
