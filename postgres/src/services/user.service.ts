import { knex as client } from "./database.service";
import { User } from "../models/user.model";

const table: string = 'users';

export const getAllUsers = (): Promise<User[]> => {
    return client(table).select('*');
};

export const getUserById = (id: string): Promise<User[]> => {
    return client(table).select().where({'id': id});
};

export const addUser = (user: User): Promise<User[]> => {
    return client(table).insert(user).returning('*')
};

export const deleteUser = (id: string) => {
    return client(table).where({'id': id}).update({isDeleted: true})
};

export const updateUser = (id: string, user: any): Promise<User[]> => {
    return client(table).where({'id': id}).update({...user}).returning('*')
};
