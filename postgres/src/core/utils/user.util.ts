import { User } from "../models";

export const createUser = (body: any): User => {
    return {
        ...body,
        isDeleted: false,
    };
};
