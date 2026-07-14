import { ICreateWorkflow, IUpdateWorkflow } from "./workflow.interface";
import * as workflowRepository from "./workflow.repository";

export const createWorkflow = async (
    data: ICreateWorkflow
) => {
    return await workflowRepository.createWorkflow(data);

};

export const getAllWorkflows = async () => {
    return await workflowRepository.getAllWorkflows();
};

export const getAllWorkflowsById = async (
    id: number 
) => {
    const workflow = 
        await workflowRepository.getAllWorkflowsById(id);

        if(!workflow){
            throw new Error("Workflow not found");
        }

        return workflow;

};

export const getWorkflowById = async (
  id: number
) => {
  const workflow =
    await workflowRepository.getWorkflowById(id);

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  return workflow;
};


export const getActiveWorkflowsByTrigger = async (
    triggerEvent: string 
)=> {
    return await workflowRepository.getActiveWorkflowsByTrigger(
        triggerEvent 
    );
};

export const updateWorkflow = async (
    id: number,
    data: IUpdateWorkflow
) => {
    const workflow = 
        await workflowRepository.getAllWorkflowsById(id);

    if(!workflow){
        throw new Error("Workflow not found");
    }

    return await workflowRepository.updateWorkflow(
        id,
        data 
    );
};

export const deleteWorkflow = async (
    id: number 
) => {
    const workflow = await workflowRepository.getWorkflowById(id);

    if(!workflow){
        throw new Error("Workflow not found");
    }

    return await workflowRepository.deleteWorkflow(id)
};



