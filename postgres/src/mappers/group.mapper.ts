import { Group } from "../models";

export const toDomain = (data: any): Group => {
    return {
        ...data,
        permissions: data.permissions.split(',')
    }
};

export const toBase = (data: Group): any => {
    return {
        ...data,
        permissions: data.permissions.join(',')
    }
};
