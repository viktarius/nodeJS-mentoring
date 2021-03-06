import { knex as client } from "./database.service";
import { Group } from "../models";
import { HttpException } from "../exeption";

const table: string = 'groups';

export const getAllGroups = (): Promise<Array<Group>> => {
    return client(table).select('*')
};

export const getGroupById = (id: string): Promise<Array<Group>> => {
    return client(table).select().where({'id': id})
};

export const addGroup = (group: Group): Promise<Array<Group>> => {
    return client(table).insert(group).returning('*')
};

export const deleteGroup = (id: string) => {
    return client(table).where({'id': id}).then(rows => {
        if (rows.length !== 1) {
            throw new HttpException(404, 'group not found')
        } else {
            return client(table).where({'id': id}).del()
        }
    })
};

export const updateGroup = (id: string, group: any): Promise<Array<Group>> => {
    return client(table).where({'id': id}).then(rows => {
        if (rows.length !== 1) {
            throw new HttpException(404, 'group not found')
        } else {
            return client(table).where({'id': id}).update({...group}).returning('*')
        }
    })
};
