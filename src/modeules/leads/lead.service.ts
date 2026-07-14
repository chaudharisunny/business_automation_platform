import { ICreateLead, IUpdateLead } from "./lead.interface";
import * as leadRepository from "./lead.repository";

export const createLead = async (data: ICreateLead) => {
    return await leadRepository.createLead(data);
};

export const getAllLeads = async () => {
    return await leadRepository.getAllLeads();
};

export const getLeadById = async (id: number) => {
    const lead = await leadRepository.getLeadById(id);

    if(!lead){
        throw new Error("lead not found");
    }

    return lead; 
};

export const updateLead = async (
    id: number,
    data: IUpdateLead
) => {
    const lead = await leadRepository.getLeadById(id);

    if(!lead){
        throw new Error("lead not found")
    }

    return await leadRepository.updateLead(id, data);
};

export const deleteLead = async (id: number) => {
    const lead = await leadRepository.getLeadById(id);

    if(!lead){
        throw new Error("Lead not found");
    }

    return await leadRepository.deleteLead(id);
}