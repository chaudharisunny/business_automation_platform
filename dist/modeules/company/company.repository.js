"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompany = exports.updateCompany = exports.getCompanyByEmail = exports.getCompanyById = exports.getAllCompanies = exports.createCompany = void 0;
const db_1 = require("../../config/db");
const createCompany = async (data) => {
    const { company_name, email, phone, website, industry, address, city, state, country, postal_code } = data;
    const result = await db_1.pool.query(`
        INSERT INTO companies (
            company_name,
            email, 
            phone, 
            website, 
            industry, 
            address, 
            city, 
            state, 
            country, 
            postal_code
        )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING *;
        `, [
        company_name,
        email,
        phone,
        website,
        industry,
        address,
        city,
        state,
        country,
        postal_code
    ]);
    return result.rows[0];
};
exports.createCompany = createCompany;
const getAllCompanies = async () => {
    const result = await db_1.pool.query("SELECT * FROM companies ORDER BY id ASC");
    return result.rows;
};
exports.getAllCompanies = getAllCompanies;
const getCompanyById = async (id) => {
    const result = await db_1.pool.query("SELECT * FROM companies WHERE id = $1", [id]);
    return result.rows[0];
};
exports.getCompanyById = getCompanyById;
const getCompanyByEmail = async (email) => {
    const result = await db_1.pool.query("SELECT * FROM companies WHERE email = $1", [email]);
    return result.rows[0];
};
exports.getCompanyByEmail = getCompanyByEmail;
const updateCompany = async (id, data) => {
    const { company_name, email, phone, website, industry, address, city, state, country, postal_code, } = data;
    const result = await db_1.pool.query(`
    UPDATE companies
    SET
      company_name = COALESCE($1, company_name),
      email = COALESCE($2, email),
      phone = COALESCE($3, phone),
      website = COALESCE($4, website),
      industry = COALESCE($5, industry),
      address = COALESCE($6, address),
      city = COALESCE($7, city),
      state = COALESCE($8, state),
      country = COALESCE($9, country),
      postal_code = COALESCE($10, postal_code)
    WHERE id = $11
    RETURNING *;
    `, [
        company_name,
        email,
        phone,
        website,
        industry,
        address,
        city,
        state,
        country,
        postal_code,
        id,
    ]);
    return result.rows[0];
};
exports.updateCompany = updateCompany;
// Delete Company
const deleteCompany = async (id) => {
    const result = await db_1.pool.query(`
    DELETE FROM companies
    WHERE id = $1
    RETURNING *;
    `, [id]);
    return result.rows[0];
};
exports.deleteCompany = deleteCompany;
//# sourceMappingURL=company.repository.js.map