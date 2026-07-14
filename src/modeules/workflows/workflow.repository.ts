import { pool } from "../../config/db";
import { IUpdateCompany } from "../company/company.interface";
import { ICreateWorkflow, IUpdateWorkflow } from "./workflow.interface";

export const createWorkflow = async (
    data: ICreateWorkflow
) => {
    const {
        company_id,
        name,
        trigger_event,
        action_type,
    } = data;

    const result = await pool.query(
        `
        INSERT INTO workflows (
        company_id,
        name,
        trigger_event,
        action_type
        )
        VALUES ($1,$2,$3,$4)
        RETURNING *;
        `,
        [
            company_id,
            name,
            trigger_event,
            action_type, 
        ]
    );

    return result.rows[0];
}

export const getAllWorkflows = async()=>{
    const result = await pool.query(
        "SELECT * FROM workflows ORDER BY id DESC"
    );

    return result.rows;
};

export const getAllWorkflowsById = async(
    id: number
) => {
    const result = await pool.query(
        "SELECT * FROM workflows WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

export const getActiveWorkflowsByTrigger = async (
    trigger_event: string 
) => {
    const result = await pool.query(
        `
        SELECT * FROM workflows WHERE trigger_event = $1
            AND is_active = TRUE
        `,
        [trigger_event] 
    );

    return result.rows; 
};

export const getWorkflowById = async (
  id: number
) => {
  const result = await pool.query(
    "SELECT * FROM workflows WHERE id = $1",
    [id]
  );

  return result.rows[0];
};


export const updateWorkflow = async(
    id: number,
    data: IUpdateWorkflow
) => {
    const{
         name,
    trigger_event,
    action_type,
    is_active
    } = data;
   
    const result = await pool.query(
        `
        UPDATE workflows 
        SET 
            name = $1,
            trigger_event = $2,
            action_type = $3,
            is_active = $4,
            update_at = CURRENT_TIMESTAMP
            WHERE id = $5 RETURNING *;
        `,
        [
            name,
            trigger_event,
            action_type,
            is_active,
            id,
        ]
    );
    return result.rows[0];
};

export const deleteWorkflow  = async (
    id: number
) => {
    const result = await pool.query(
        `
        DELETE FROM workflows
        WHERE id = $1
        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];
}