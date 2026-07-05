
import { pool } from "../../config/db";
import  { ICreateCompany, IUpdateCompany } from "./company.interface"

export const createCompany = async(data: ICreateCompany) => {
    const {
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
    } = data;

    const result = await pool.query(
        `
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
        `,
        [
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
        ]
    );

    return result.rows[0];
};

export const getAllCompanies = async () => {
    const result = await pool.query(
        "SELECT * FROM companies ORDER BY id ASC"
    );

    return result.rows;
}

export const getCompanyById = async (id: number) => {
    const result = await pool.query(
        "SELECT * FROM companies WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

export const getCompanyByEmail = async (email: string) => {
    const result = await pool.query(
        "SELECT * FROM companies WHERE email = $1",
        [email]
    );

    return result.rows[0];
}

export const updateCompany = async (
  id: number,
  data: IUpdateCompany
) => {
  const {
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
  } = data;

  const result = await pool.query(
    `
    UPDATE companies
    SET
      company_name = $1,
      email = $2,
      phone = $3,
      website = $4,
      industry = $5,
      address = $6,
      city = $7,
      state = $8,
      country = $9,
      postal_code = $10
    WHERE id = $11
    RETURNING *;
    `,
    [
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
    ]
  );

  return result.rows[0];
};

// Delete Company
export const deleteCompany = async (id: number) => {
  const result = await pool.query(
    `
    DELETE FROM companies
    WHERE id = $1
    RETURNING *;
    `,
    [id]
  );

  return result.rows[0];
};