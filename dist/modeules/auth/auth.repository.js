"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUserEmail = void 0;
const db_1 = require("../../config/db");
const findUserEmail = async (email) => {
    const result = await db_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};
exports.findUserEmail = findUserEmail;
const createUser = async (name, email, password) => {
    const result = await db_1.pool.query(`INSERT INTO users(name,email,password)
        VALUES($1,$2,$3)
        RETURNING *`, [name, email, password]);
    return result.rows[0];
};
exports.createUser = createUser;
//# sourceMappingURL=auth.repository.js.map