"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const db_1 = require("../../config/db");
const getAllUsers = async () => {
    const result = await db_1.pool.query("SELECT * FROM users");
    return result.rows;
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    const result = await db_1.pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};
exports.getUserById = getUserById;
const updateUser = async (id, name, email) => {
    const result = await db_1.pool.query(`UPDATE users SET name = $1,
         email = $2 WHERE id = $3 RETURNING *`, [name, email, id]);
    return result.rows[0];
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    await db_1.pool.query("DELETE FROM users WHERE id = $1", [id]);
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.repository.js.map