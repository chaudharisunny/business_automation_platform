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
const leadSerivce = __importStar(require("./lead.service"));
const createLead = async (req, res) => {
    try {
        const lead = await leadSerivce.createLead(req.body);
        res.status(201).json({
            success: true,
            message: "Lead created successfully",
            data: lead,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createLead = createLead;
const getAllLeads = async (req, res) => {
    try {
        const leads = await leadSerivce.getAllLeads();
        res.status(200).json({
            success: true,
            data: leads,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAllLeads = getAllLeads;
const getLeadById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const lead = await leadSerivce.getLeadById(id);
        res.status(200).json({
            success: true,
            data: lead,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getLeadById = getLeadById;
const updateLead = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const lead = await leadSerivce.updateLead(id, req.body);
        res.status(200).json({
            success: true,
            message: "Lead updated successfully",
            data: lead,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateLead = updateLead;
const deleteLead = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await leadSerivce.deleteLead(id);
        res.status(200).json({
            success: true,
            message: "Lead deleted successfully",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteLead = deleteLead;
//# sourceMappingURL=lead.controller.js.map