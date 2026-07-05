import { pool } from "../../config/db"

export const getAllUsers = async()=>{
    
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
};

export const getUserById = async (id: number) => {
    
    const result = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id] 
    );

    return result.rows[0];
};

export const updateUser = async (
    id: number,
    name: string,
    email: string
) => {
    const result = await pool.query(
        `UPDATE users SET name = $1,
         email = $2 WHERE id = $3 RETURNING *`,
         [name, email, id]
    );

    return result.rows[0];
};

export const deleteUser = async (id: number) => {
    await pool.query(
        "DELETE FROM users WHERE id = $1",
        [id]
    );
};