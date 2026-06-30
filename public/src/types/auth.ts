export interface IUser {
    id: number;
    full_name: string;
    email: string;
    role: string;
}

export interface ILoginResponse {
    user: IUser;
    access_token: string;
    refresh_token: string;
}