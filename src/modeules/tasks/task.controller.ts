import { Request, Response } from "express";
import * as taskService from "./task.service";
import { success } from "zod";

export const createTask = async (
    req: Request,
    res: Response 
): Promise<void> => {
    try {
        const task = await taskService.createTask(req.body);

        res.status(201).json({
            success: true,
            message: "Task create successfully"
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message, 
        });
    }
};

export const getAllTasks = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const task = await taskService.getAllTasks();

        res.status(200).json({
            success: true,
            data: task,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getTaskById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const task = await taskService.getTaskById(id);

        res.status(200).json({
            success: true,
            data: task,
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateTask = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const task = await taskService.updateTask(id, req.body);

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteTask = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        await taskService.deleteTask(id);

        res.status(200).json({
            success:true,
            message: "Task delete successully",
        });
    }catch (error: any){
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
