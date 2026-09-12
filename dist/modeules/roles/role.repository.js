"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.updateRole = exports.getRoleByName = exports.getRoleById = exports.getAllROles = exports.createdRole = void 0;
const db_1 = require("../../config/db");
const createdRole = async (data) => {
    const { name, description } = data;
    const result = await db_1.pool.query(`
        INSERT INTO roles (name, description)
        VALUES ($1, $2)
        RETURNING *
        `, [name, description]);
    return result.rows[0];
};
exports.createdRole = createdRole;
const getAllROles = async () => {
    const result = await db_1.pool.query("SELECT * FROM roles ORDER BY id ASC");
    return result.rows;
};
exports.getAllROles = getAllROles;
const getRoleById = async (id) => {
    const result = await db_1.pool.query("SELECT * FROM roles WHERE id = $1", [id]);
    return result.rows[0];
};
exports.getRoleById = getRoleById;
const getRoleByName = async (name) => {
    const result = await db_1.pool.query("SELECT * FROM roles WHERE name = $1", [name]);
    return result.rows[0];
};
exports.getRoleByName = getRoleByName;
const updateRole = async (id, data) => {
    const { name, description } = data;
    const result = await db_1.pool.query(`
        UPDATE roles
        SET 
            name = COALESCE($1, name),
            description = COALESCE($2, description)
           
        WHERE id = $3
        RETURNING *
        `, [name, description, id]);
    return result.rows[0];
};
exports.updateRole = updateRole;
const deleteRole = async (id) => {
    const result = await db_1.pool.query(`
        DELETE FROM roles
        WHERE id = $1
        RETURNING *
        `, [id]);
    return result.rows[0];
};
exports.deleteRole = deleteRole;
//# sourceMappingURL=role.repository.js.map