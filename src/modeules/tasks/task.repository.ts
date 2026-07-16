import { pool } from "../../config/db";
import { IcreateTask, IUpdateTask } from "./task.interface";

export const createTask = async (data: IcreateTask) => {
    const {lead_id,assigned_to,title,description,priority,due_date}=data;

    const result = await pool.query(
        `INSERT INTO tasks (
        lead_id,
        assigned_to,
        title,
        description,
        priority,
        due_date
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *;
        `,
        [
            lead_id,
            assigned_to,
            title,
            description,
            priority,
            due_date,
        ]
    );

    return result.rows[0];
};

export const getAllTasks = async () => {
    const result = await pool.query(
        "SELECT * FROM task ORDER BY id DESC"
    );

    return result.rows;
};

export const getTaskById = async (id: number) => {
    const result = await pool.query(
        "SELECT * FROM task WHERE id = $1",
        [id]
    );

    return result.rows[0]
}

export const updateTask = async (
    id: number,
    data: IUpdateTask 
) => {
    const {
        assigned_to,title,description,status,priority,due_date} = data;
    
        const result = await pool.query(
            `UPDATE tasks 
            SET 
                assigned_to = $1,
                title = $2,
                description = $3,
                priority = $5;
                due_date = $6,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $7
            RETURNING *;    
            `,
            [
                assigned_to,
                title,
                description,
                status,
                priority,
                due_date,
                id,    
            ]
        );

        return result.rows[0];
    };

export const deleteTask = async (id: number) => {
    const result = await pool.query(
        `
        DELETE FROM tasks
        WHERE id = $1
        RETURNING *;

        `,
        [id]
    );

    return result.rows[0];
};    