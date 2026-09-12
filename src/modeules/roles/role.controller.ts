import { Request, Response } from "express";
import * as roleService from "./role.service";

export const createdRole = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const role = await roleService.createRole(req.body);

        res.status(201).json({
            success: true,
            message: "Role created successfully",
            data: role,
        });
    } catch (error: any){
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllROles = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const roles = await roleService.getAllROles();

        res.status(200).json({
            success: true,
            data: roles,
        });
    } catch(error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getRoleById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try{
        const id = Number(req.params.id);

        const role = await roleService.getRoleById(id);

        res.status(200).json({
            success: true,
            data: role,
        });
        
    }catch ( error: any){
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const role = await roleService.updateRole(id, req.body);

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: role,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    await roleService.deleteROle(id);

    res.status(200).json({
      success: true,
      message: "Role deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};