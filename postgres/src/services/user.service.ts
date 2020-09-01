import { knex as client } from "./database.service";
import { UserRequest } from "../models/user.model";

const table: string = 'users';

export const getAllUsers = (): Promise<UserRequest[]> => {
    return client(table).select('*');
};

export const getUserById = (id: string): Promise<UserRequest[]> => {
    return client(table).select().where({'id': id});
};

export const addUser = (user: UserRequest): Promise<UserRequest[]> => {
    return client(table).insert(user).returning('*')
};

export const deleteUser = (id: string) => {
    return client(table).where({'id': id}).update({isdeleted: 1})
};

export const updateUser = (id: string, user: any): Promise<UserRequest[]> => {
    return client(table).where({'id': id}).update({...user}).returning('*')
};
