
export interface IRole {
    
    id?: number;
    name: string;
    description: string;
    created_at?: Date;

}

export interface ICreateRole {

    name: string;
    description: string;

}

export interface IUpdateRole {

    name?: string,
    description?: string;
    
}