"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateLead = exports.getLeadById = exports.getAllLeads = exports.createLead = void 0;
const db_1 = require("../../config/db");
const createLead = async (data) => {
    const { company_id, assigned_to, full_name, email, phone, source, notes } = data;
    const result = await db_1.pool.query(`
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
        `, [
        company_id,
        assigned_to,
        full_name,
        email,
        phone,
        source,
        notes
    ]);
    return result.rows[0];
};
exports.createLead = createLead;
const getAllLeads = async () => {
    const result = await db_1.pool.query("SELECT * FROM leads ORDER by id DESC");
    return result.rows;
};
exports.getAllLeads = getAllLeads;
const getLeadById = async (id) => {
    const result = await db_1.pool.query("SELECT * FROM leads WHERE id = $1", [id]);
    return result.rows[0];
};
exports.getLeadById = getLeadById;
const updateLead = async (id, data) => {
    const { assigned_to, full_name, email, phone, source, status, notes, } = data;
    const result = await db_1.pool.query(`
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
        `, [
        assigned_to,
        full_name,
        email,
        phone,
        source,
        status,
        notes,
        id,
    ]);
    return result.rows[0];
};
exports.updateLead = updateLead;
const deleteLead = async (id) => {
    const result = await db_1.pool.query(`
        DELETE FROM leads
        WHERE id = $1
        RETURNING *;
        `, [id]);
    return result.rows[0];
};
exports.deleteLead = deleteLead;
//# sourceMappingURL=lead.repository.js.map