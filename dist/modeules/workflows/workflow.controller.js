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
exports.deleteWorkflow = exports.updateWorkflow = exports.getWorkflowById = exports.getAllWorkflows = exports.createWorkflow = void 0;
const workflowService = __importStar(require("./workflow.service"));
// Create Workflow
const createWorkflow = async (req, res) => {
    try {
        const workflow = await workflowService.createWorkflow(req.body);
        res.status(201).json({
            success: true,
            message: "Workflow created successfully",
            data: workflow,
        });
    }
    catch (error) {
        console.error("Workflow Error:", error);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createWorkflow = createWorkflow;
// Get All Workflows
const getAllWorkflows = async (req, res) => {
    try {
        const workflows = await workflowService.getAllWorkflows();
        res.status(200).json({
            success: true,
            data: workflows,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAllWorkflows = getAllWorkflows;
// Get Workflow By ID
const getWorkflowById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const workflow = await workflowService.getWorkflowById(id);
        res.status(200).json({
            success: true,
            data: workflow,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getWorkflowById = getWorkflowById;
// Update Workflow
const updateWorkflow = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const workflow = await workflowService.updateWorkflow(id, req.body);
        res.status(200).json({
            success: true,
            message: "Workflow updated successfully",
            data: workflow,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateWorkflow = updateWorkflow;
// Delete Workflow
const deleteWorkflow = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await workflowService.deleteWorkflow(id);
        res.status(200).json({
            success: true,
            message: "Workflow deleted successfully",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteWorkflow = deleteWorkflow;
//# sourceMappingURL=workflow.controller.js.map