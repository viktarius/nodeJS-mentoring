import { DataMapper } from "./data.mapper";
import { User, UserRequest } from "../models/user.model";

export class UserMapper extends DataMapper {
    toDomain(data: UserRequest): User {
        return {
            id: data.id,
            login: data.login,
            password: data.password,
            age: data.age,
            isDeleted: !!data.isdeleted
        }
    }

    toBase(data: User): UserRequest {
        return {
            id: data.id,
            login: data.login,
            password: data.password,
            age: data.age,
            isdeleted: data.isDeleted ? 1 : 0
        };
    }
}