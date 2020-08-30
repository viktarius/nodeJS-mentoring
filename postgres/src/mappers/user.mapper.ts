import { DataMapper } from "./data.mapper";
import { User, UserRequest } from "../models/user.model";

export class UserMapper extends DataMapper {
    toDomain(data: UserRequest): User {
        return {
            ...data,
            isDeleted: !!data.isDeleted
        }
    }

    toBase(data: User): UserRequest {
        return {
            ...data,
            isDeleted: data.isDeleted ? 1 : 0
        }
    }
}