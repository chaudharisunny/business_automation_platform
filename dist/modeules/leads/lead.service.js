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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateLead = exports.getLeadById = exports.getAllLeads = exports.createLead = void 0;
const leadRepository = __importStar(require("./lead.repository"));
const createLead = async (data) => {
    return await leadRepository.createLead(data);
};
exports.createLead = createLead;
const getAllLeads = async () => {
    return await leadRepository.getAllLeads();
};
exports.getAllLeads = getAllLeads;
const getLeadById = async (id) => {
    const lead = await leadRepository.getLeadById(id);
    if (!lead) {
        throw new Error("lead not found");
    }
    return lead;
};
exports.getLeadById = getLeadById;
const updateLead = async (id, data) => {
    const lead = await leadRepository.getLeadById(id);
    if (!lead) {
        throw new Error("lead not found");
    }
    return await leadRepository.updateLead(id, data);
};
exports.updateLead = updateLead;
const deleteLead = async (id) => {
    const lead = await leadRepository.getLeadById(id);
    if (!lead) {
        throw new Error("Lead not found");
    }
    return await leadRepository.deleteLead(id);
};
exports.deleteLead = deleteLead;
//# sourceMappingURL=lead.service.js.map