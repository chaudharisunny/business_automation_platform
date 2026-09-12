import * as roleRepository from "./role.repository"
import { ICreateRole, IUpdateRole } from "./role.interface";

export const createRole = async (data: ICreateRole) => {

    const existingRole = await roleRepository.getRoleByName(data.name);

    if(existingRole){
        throw new Error("Role already exists");
    }

    return await roleRepository.createdRole(data);
};

export const getAllROles = async () => {
    
    return await roleRepository.getAllROles();
};

export const getRoleById = async (id: number) => {
    const role = await roleRepository.getRoleById(id);

    if(!role) {
        throw new Error("Role not found");
    }

    return role;
};

export const updateRole = async (
    id: number,
    data: IUpdateRole
) => {
    const role = await roleRepository.getRoleById(id);

    if(!role){
        throw new Error("Role is not found");
    }

    return await roleRepository.updateRole(id, data);
};

export const deleteROle = async (id: number) => {

    const role = await roleRepository.getRoleById(id);

    if(!role){
        throw new Error("Role not found");
    }

    return await roleRepository.deleteRole(id);
}