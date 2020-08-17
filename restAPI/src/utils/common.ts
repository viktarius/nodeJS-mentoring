import { UserModel } from "./user.model";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user";

export const users: UserModel[] = [{
    id: uuidv4(),
    login: "first",
    password: "password-1",
    age: 23,
    isDeleted: false
}, {
    id: uuidv4(),
    login: "second",
    password: "password-2",
    age: 24,
    isDeleted: false
}, {
    id: uuidv4(),
    login: "fitr",
    password: "password-3",
    age: 25,
    isDeleted: false
}];

export const getAutoSuggestUsers = (loginSubstring: string, limit: number): UserModel[] => {
    return users
        .sort((a, b) => a.login > b.login ? 1 : -1)
        .filter(user => user.login.indexOf(loginSubstring) > -1)
        .slice(0, limit)
};

export const getActiveUsers = () => users.filter(user => !user.isDeleted);
export const getCurrentUser = (id: string) => users.find(user => user.id === id);
export const createUser = (body: any) => {
    const {login, password, age} = body;
    return new User(login, password, age);
};
export const addUser = (user: UserModel) => users.push(user);
export const deleteUser = (user: UserModel) => user.isDeleted = true;
export const updateUser = (user: UserModel, body: any) => {
    const {login, password, age} = body;
    user.login = login || user.login;
    user.password = password || user.password;
    user.age = age || user.age;
};
export const green = (text: string | number) => `\x1b[32m${text}\x1b[0m`;
