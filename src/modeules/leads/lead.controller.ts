import { Request, Response } from "express";
import * as leadSerivce from "./lead.service"

export const createLead = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const lead = await leadSerivce.createLead(req.body);

        res.status(201).json({
            success: true,
            message: "Lead created successfully",
            data: lead,
        });
    } catch(error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllLeads = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const leads = await leadSerivce.getAllLeads();

        res.status(200).json({
            success: true,
            data: leads, 
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getLeadById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = Number(req.params.id);

        const lead = await leadSerivce.getLeadById(id);

        res.status(200).json({
            success: true,
            data: lead,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message, 
        });
    }
};

export const updateLead = async (
    req: Request,
    res: Response
):Promise<void> =>{
    try {
        const id = Number(req.params.id);
        const lead = await leadSerivce.updateLead(id, req.body);

        res.status(200).json({
            success: true,
            message: "Lead updated successfully",
            data: lead,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteLead = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = Number(req.params.id);

        await leadSerivce.deleteLead(id);

        res.status(200).json({
            success: true,
            message: "Lead deleted successfully",
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message, 
        });
    }
};