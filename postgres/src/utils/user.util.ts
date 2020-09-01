import { User } from "../models/user.model";

export const createUser = (body: any): User => {
    return {
        ...body,
        isDeleted: false,
    };
};
