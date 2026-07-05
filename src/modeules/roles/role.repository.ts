import { pool } from "../../config/db";
import { ICreateRole, IUpdateRole } from "./role.interface";

export const createdRole = async (data: ICreateRole) => {
    
    const {name, description} = data;
    
    const result = await pool.query(
        `
        INSERT INTO roles (name, description)
        VALUES ($1, $2)
        RETURNING *
        `,
        [name, description] 
    );

    return result.rows[0];
};

export const getAllROles = async() =>{

    const result = await pool.query(
        "SELECT * FROM roles ORDER BY id ASC"
    );

    return result.rows;
};

export const getRoleById = async (id: number) =>{

    const result = await pool.query(
        "SELECT * FROM roles WHERE name = $1",
        [id]
    );

    return result.rows[0]; 
}; 

export const getRoleByName = async (name: string) => {

    const result = await pool.query(
        "SELECT * FROM roles WHERE name = $1",
        [name] 
    );

    return result.rows[0];
}

export const updateRole = async (
    id: number,
    data: IUpdateRole
) => {
    const { name, description} = data;

    const result = await pool.query(
        `
        UPDATE roles
        SET 
            name = $1,
            description = $2 
           
        WHERE id = $3
        RETURNING *
        `,
        [name, description, id]
    );

    return result.rows[0];
};

export const deleteRole = async (id: number) => {
    
    const result = await pool.query(
        `
        DELETE FROM roles
        WHERE id = $1
        RETURNING *
        `,
        [id] 
    );

    return result.rows[0];
};