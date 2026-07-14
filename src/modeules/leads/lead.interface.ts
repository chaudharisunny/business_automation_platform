export interface ILead {
    id?: number;
    company_id: number;
    assigned_to?: number;
    fullname: string;
    email?: string;
    phone?: string;
    source?: string;
    notes?: string;
    created_at: Date;
    updated_at: Date;
}

export interface ICreateLead {
    company_id: number;
    assigned_to: number;
    full_name: string;
    email?: string;
    phone?: string;
    source?: string;
    notes?: string;
}

export interface IUpdateLead {
    assigned_to?: number;
    full_name?: string;
    email?: string;
    phone?: string;
    source?: string;
    status?: string;
    notes?: string;
}