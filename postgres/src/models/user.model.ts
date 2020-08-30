export interface User {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export interface UserRequest {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: number;
}
