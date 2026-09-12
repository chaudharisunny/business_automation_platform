import { IUpdateCompany } from "../company/company.interface";
import { IcreateTask, IUpdateTask } from "./task.interface";
import * as taskRepository from "./task.repository";

export const createTask = async (data: IcreateTask) => {
    return await taskRepository.createTask(data);
};

export const getAllTasks = async () => {
    return await taskRepository.getAllTasks();
};

export const getTaskById = async (id: number) => {
    const task = await taskRepository.getTaskById(id);

    if(!task){
        throw new Error("Task not found");
    }

    return task;
};

export const updateTask = async (
    id: number,
    data: IUpdateTask 
) => {
    const task = await taskRepository.getTaskById(id);

    if(!task){
        throw new Error("Task not found");
    }

    return await taskRepository.updateTask(id, data);
};

export const deleteTask = async (id: number) => {
    const task = await taskRepository.getTaskById(id);

    if(!task){
        throw new Error("Task not found");
    }

    return await taskRepository.deleteTask(id);
}