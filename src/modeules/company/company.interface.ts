export interface ICreateCompany{
    id?: number;
    company_name: string;
    email: string;
    phone?: string;
    website?: string;
    industry?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface IUpdateCompany {
    company_name?: string;
    email?: string;
    phone?: string;
    website?: string;
    industry?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
}