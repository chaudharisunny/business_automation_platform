export interface ITask {
    id?: number;
    
    lead_id: number;
    assigned_to: number;
    
    title: string;
    description: string;

    status?: string;
    priority?: string;

    due_date?: Date;

    created_at?: Date;
    updated_at?: Date;
}

export interface IcreateTask {
    lead_id: number;
    assigned_to: number;

    title: string;
    description?: string;

    priority?: string;

    due_date?: Date;
}

export interface IUpdateTask {
    assigned_to?: number;

    title?: string;
    description?: string;

    status?: string;
    priority?: string;

    due_date?: Date;
}