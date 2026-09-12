"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkflow = exports.updateWorkflow = exports.getWorkflowById = exports.getActiveWorkflowsByTrigger = exports.getAllWorkflowsById = exports.getAllWorkflows = exports.createWorkflow = void 0;
const db_1 = require("../../config/db");
const createWorkflow = async (data) => {
    const { company_id, name, trigger_event, action_type, } = data;
    const result = await db_1.pool.query(`
        INSERT INTO workflows (
        company_id,
        name,
        trigger_event,
        action_type
        )
        VALUES ($1,$2,$3,$4)
        RETURNING *;
        `, [
        company_id,
        name,
        trigger_event,
        action_type,
    ]);
    return result.rows[0];
};
exports.createWorkflow = createWorkflow;
const getAllWorkflows = async () => {
    const result = await db_1.pool.query("SELECT * FROM workflows ORDER BY id DESC");
    return result.rows;
};
exports.getAllWorkflows = getAllWorkflows;
const getAllWorkflowsById = async (id) => {
    const result = await db_1.pool.query("SELECT * FROM workflows WHERE id = $1", [id]);
    return result.rows[0];
};
exports.getAllWorkflowsById = getAllWorkflowsById;
const getActiveWorkflowsByTrigger = async (trigger_event) => {
    const result = await db_1.pool.query(`
        SELECT * FROM workflows WHERE trigger_event = $1
            AND is_active = TRUE
        `, [trigger_event]);
    return result.rows;
};
exports.getActiveWorkflowsByTrigger = getActiveWorkflowsByTrigger;
const getWorkflowById = async (id) => {
    const result = await db_1.pool.query("SELECT * FROM workflows WHERE id = $1", [id]);
    return result.rows[0];
};
exports.getWorkflowById = getWorkflowById;
const updateWorkflow = async (id, data) => {
    const { name, trigger_event, action_type, is_active } = data;
    const result = await db_1.pool.query(`
        UPDATE workflows 
        SET 
            name = COALESCE($1, name),
            trigger_event = COALESCE($2, trigger_event),
            action_type = COALESCE($3, action_type),
            is_active = COALESCE($4, is_active),
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $5 RETURNING *;
        `, [
        name,
        trigger_event,
        action_type,
        is_active,
        id,
    ]);
    return result.rows[0];
};
exports.updateWorkflow = updateWorkflow;
const deleteWorkflow = async (id) => {
    const result = await db_1.pool.query(`
        DELETE FROM workflows
        WHERE id = $1
        RETURNING *;
        `, [id]);
    return result.rows[0];
};
exports.deleteWorkflow = deleteWorkflow;
//# sourceMappingURL=workflow.repository.js.map