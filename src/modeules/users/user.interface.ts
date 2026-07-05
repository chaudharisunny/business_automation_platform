export interface IUser{
    id?: number;
    name: string;
    email: string;
    phone?:string;
    roleId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUpdateUser {
    name: string;
    phone?: string;
    roleId?: number;
}