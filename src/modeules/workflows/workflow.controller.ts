import { Request, Response } from "express";
import * as workflowService from "./workflow.service";

// Create Workflow
export const createWorkflow = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const workflow = await workflowService.createWorkflow(req.body);

    res.status(201).json({
      success: true,
      message: "Workflow created successfully",
      data: workflow,
    });
  } catch (error: any) {
  console.error("Workflow Error:", error);

  res.status(400).json({
    success: false,
    message: error.message,
  });
}
};

// Get All Workflows
export const getAllWorkflows = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const workflows = await workflowService.getAllWorkflows();

    res.status(200).json({
      success: true,
      data: workflows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Workflow By ID
export const getWorkflowById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const workflow = await workflowService.getWorkflowById(id);

    res.status(200).json({
      success: true,
      data: workflow,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Workflow
export const updateWorkflow = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const workflow = await workflowService.updateWorkflow(
      id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Workflow updated successfully",
      data: workflow,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Workflow
export const deleteWorkflow = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    await workflowService.deleteWorkflow(id);

    res.status(200).json({
      success: true,
      message: "Workflow deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};