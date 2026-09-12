"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const db_1 = require("../../config/db");
const createTask = async (data) => {
    const { lead_id, assigned_to, title, description, priority, due_date } = data;
    const result = await db_1.pool.query(`INSERT INTO tasks (
        lead_id,
        assigned_to,
        title,
        description,
        priority,
        due_date
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *;
        `, [
        lead_id,
        assigned_to,
        title,
        description,
        priority,
        due_date,
    ]);
    return result.rows[0];
};
exports.createTask = createTask;
const getAllTasks = async () => {
    const result = await db_1.pool.query("SELECT * FROM tasks ORDER BY id DESC");
    return result.rows;
};
exports.getAllTasks = getAllTasks;
const getTaskById = async (id) => {
    const result = await db_1.pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return result.rows[0];
};
exports.getTaskById = getTaskById;
const updateTask = async (id, data) => {
    const { assigned_to, title, description, status, priority, due_date } = data;
    const result = await db_1.pool.query(`UPDATE tasks 
            SET 
                    assigned_to = COALESCE($1, assigned_to),
                    title = COALESCE($2, title),
                    description = COALESCE($3, description),
                    status = COALESCE($4, status),
                    priority = COALESCE($5, priority),
                    due_date = COALESCE($6, due_date),
                updated_at = CURRENT_TIMESTAMP
                WHERE id = $7
            RETURNING *;    
            `, [
        assigned_to,
        title,
        description,
        status,
        priority,
        due_date,
        id,
    ]);
    return result.rows[0];
};
exports.updateTask = updateTask;
const deleteTask = async (id) => {
    const result = await db_1.pool.query(`
        DELETE FROM tasks
        WHERE id = $1
        RETURNING *;

        `, [id]);
    return result.rows[0];
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.repository.js.map