import { Request, Response } from "express";
import * as userService from "./user.service";

export const getAllUsers = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const users = await userService.getAllUsers();

        res.status(200).json({
            success: true,
            data: users, 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Faild to fetch users",
        });
    }
}

export const getUserById = async (
    req: Request,
    res: Response 
): Promise<void> => {
    try {
        const id= Number(req.params.id);

        const user = await userService.getUserById(id);

        if(!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user",
        });
    }
};

export const updateaUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const {name,email}= req.body;

        const updateaUser = await userService.updateaUser(
            id,
            name,
            email 
        );

        res.status(200).json({
            success: true,
            message: "User update successfully",
            data: updateaUser,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Faild to update user",
        });
    }
};

export const deleteUser = async(
    req: Request,
    res: Response
): Promise<void> =>{
    try {
        const id = Number(req.params.id);
        await userService.deleteUser(id);

        res.status(200).json({
            success:true,
            message: "user deleted successfully",
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to deleted user",
        });
    }
};