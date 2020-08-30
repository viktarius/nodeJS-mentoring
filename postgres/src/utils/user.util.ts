import { User } from "../models/user.model";
import { v4 as uuidv4 } from "uuid";

export const createUser = (body: any): User => {
    const user: User = {
        ...body,
        id: uuidv4(),
        isDeleted: false,
    };
    return user;
};
