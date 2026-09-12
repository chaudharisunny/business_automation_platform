import { pool } from "../../config/db";
import { ICreateLead, IUpdateLead } from "./lead.interface";

export const createLead = async (data: ICreateLead) => {
    const {
        company_id,
        assigned_to,
        full_name,
        email,
        phone,
        source,
        notes
    } = data;

    const result = await pool.query(
        `
        INSERT INTO leads (
            company_id,
            assigned_to,
            full_name,
            email,
            phone,
            source,
            notes
        )
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING *;
        `,
        [
            company_id,
            assigned_to,
            full_name,
            email,
            phone,
            source,
            notes
        ]
    );

    return result.rows[0];
};

export const getAllLeads = async () => {
    const result = await pool.query(
        "SELECT * FROM leads ORDER by id DESC"
    );
    return result.rows;
}; 

export const getLeadById = async (id: number) => {
    const result = await pool.query(
        "SELECT * FROM leads WHERE id = $1",
        [id] 
    );

    return result.rows[0]; 
};

export const updateLead = async (
    id: number,
    data: IUpdateLead
) => {
    const {
        assigned_to,
        full_name,
        email,
        phone,
        source,
        status,
        notes,
    } = data;

    const result = await pool.query(
        `
        UPDATE leads 
        SET
            assigned_to = COALESCE($1, assigned_to),
            full_name = COALESCE($2, full_name),
            email = COALESCE($3, email),
            phone = COALESCE($4, phone),
            source = COALESCE($5, source),
            status = COALESCE($6, status),
            notes = COALESCE($7, notes),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING *;    
        `,
        [
             assigned_to,
            full_name,
            email,
            phone,
            source,
            status,
            notes,
            id,
        ]
    );

    return result.rows[0];
}

export const deleteLead = async (id: number) => {
    const result = await pool.query(
        `
        DELETE FROM leads
        WHERE id = $1
        RETURNING *;
        `,
        [id]
    );
    return result.rows[0];
};