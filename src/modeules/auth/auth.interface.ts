export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}
